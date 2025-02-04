// import { prisma } from "../../prisma";

import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    case "PUT":
      return PUT(req, res);
    case "PATCH":
      return PATCH(req, res);
    case "GET":
      return GET(req, res);
    case "DELETE":
      return DELETE(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "PATCH", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const POST = async (req, res) => {
  const { name, slug, url } = req.body;

  // Required fields
  const requiredFields = { name, slug };

  // Check for missing required fields
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res
        .status(400)
        .json({ error: `${field} is required`, code: 1 });
    }
  }

  try {
    const existingSlug = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res
        .status(200)
        .json({ error: "Slug already in use", code: 2 });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug: slug.toLowerCase(),
        url,
      },
    });
    res.status(201).json(createResponse( { data:newCategory}));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const PUT = async (req, res) => {
  const { name, slug, url } = req.body;

  try {
    const existingSlug = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res
        .status(200)
        .json({ error: "Slug already in use", code: 2 });
    }

    const newCategory = await prisma.category.update({
       where: { slug },
      data: {
        name,
        slug: slug.toLowerCase(),
        url,
      },
    });
    res.status(201).json(createResponse( { data:newCategory}));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const PATCH = async (req, res) => {
  const { name, slug, url } = req.body;

  try {
    // const existingSlug = await prisma.category.findUnique({
    //   where: { slug },
    // });

    // if (existingSlug) {
    //   return res
    //     .status(409)
    //     .json({ error: "Slug already in use", code: 2 });
    // }

    const newCategory = await prisma.category.update({
      where: { slug },
      data: {
        name,
        slug: slug.toLowerCase(),
        url,
      },
    });
    res.status(201).json(createResponse( { data:newCategory}));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GET = async (req, res) => {
  try {
    const { menu, id } = req.query;

    let categories;

    if (id) {
      // Fetch a single category by ID
      categories = await prisma.category.findUnique({
        where: { id: parseInt(id) },
        include: { subCategories: true },
      });

      if (!categories) {
        return res.status(404).json({ error: "Category not found" });
      }
    } else {
      // Fetch all categories
      categories = await prisma.category.findMany({
        include: { subCategories: true },
      });

      if (!menu && categories.length) {
        categories = categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }));
      }
    }

    res.status(200).json(createResponse({ data: categories }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const DELETE = async (req, res) => {
  try {
    const { id } = req.query; // Get category ID from query params

    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { subCategories: true }, // Check if it has related subcategories
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete category along with its related subcategories
    await prisma.$transaction([
      prisma.subCategory.deleteMany({
        where: { categoryId: parseInt(id) },
      }),
      prisma.category.delete({
        where: { id: parseInt(id) },
      }),
    ]);

    res.status(200).json({ message: "Category and related subcategories deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


