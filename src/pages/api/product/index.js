// import { prisma } from "../../prisma";

import prisma from "@/pages/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    case "GET":
      return GET(req, res);
    case "PATCH":
      return PATCH(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const POST = async (req, res) => {
  const {
    name,
    description,
    price,
    currency,
    SKU,
    inventory,
    categoryId,
    tags,
    images,
    isFeatured,
    rating,
    brand,
    weight,
    dimensions,
    isDiscount,
    slug,
    score,
  } = req.body;

  // Required fields
  const requiredFields = {
    name,
    slug,
    description,
    price,
    SKU,
    inventory,
    categoryId,
    tags,
  };

  // Check for missing required fields
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res
        .status(400)
        .json({ error: `${field} is required`, errorCode: 1 });
    }
  }

  try {
    const existingSlug = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res
        .status(200)
        .json({ error: "Slug already in use", errorCode: 2 });
    }
    const existingSku = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingSku) {
      return res
        .status(200)
        .json({ error: "SKU already in use", errorCode: 2 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        currency,
        SKU,
        inventory,
        categoryId,
        tags,
        images,
        isFeatured,
        rating,
        brand,
        weight,
        dimensions,
        slug,
        isDiscount,
        score,
      },
    });
    const data = { product: newProduct, status: 201 };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const PATCH = async (req, res) => {
  const {
    id,
    name,
    description,
    price,
    currency,
    SKU,
    inventory,
    categoryId,
    tags,
    images,
    isFeatured,
    rating,
    brand,
    weight,
    dimensions,
    isDiscount,
    slug,
    score,
  } = req.body;

  // Ensure 'id' is provided
  if (!id) {
    return res
      .status(400)
      .json({ error: "Product ID is required", errorCode: 1 });
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found", errorCode: 3 });
    }

    // Check if the new slug is already in use by another product
    if (slug && slug !== existingProduct.slug) {
      const existingSlug = await prisma.product.findUnique({
        where: { slug },
      });

      if (existingSlug) {
        return res
          .status(200)
          .json({ error: "Slug already in use", errorCode: 2 });
      }
    }

    // Check if the new SKU is already in use by another product
    if (SKU && SKU !== existingProduct.SKU) {
      const existingSku = await prisma.product.findUnique({
        where: { SKU },
      });

      if (existingSku) {
        return res
          .status(200)
          .json({ error: "SKU already in use", errorCode: 2 });
      }
    }

    // Collect only the fields that are provided in the request body
    const dataToUpdate = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (description !== undefined) dataToUpdate.description = description;
    if (price !== undefined) dataToUpdate.price = price;
    if (currency !== undefined) dataToUpdate.currency = currency;
    if (SKU !== undefined) dataToUpdate.SKU = SKU;
    if (inventory !== undefined) dataToUpdate.inventory = inventory;
    if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
    if (tags !== undefined) dataToUpdate.tags = tags;
    if (images !== undefined) dataToUpdate.images = images;
    if (isFeatured !== undefined) dataToUpdate.isFeatured = isFeatured;
    if (rating !== undefined) dataToUpdate.rating = rating;
    if (brand !== undefined) dataToUpdate.brand = brand;
    if (weight !== undefined) dataToUpdate.weight = weight;
    if (dimensions !== undefined) dataToUpdate.dimensions = dimensions;
    if (isDiscount !== undefined) dataToUpdate.isDiscount = isDiscount;
    if (slug !== undefined) dataToUpdate.slug = slug;
    if (score !== undefined) dataToUpdate.score = score;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });

    const data = { product: updatedProduct, status: 200 };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GET = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    const data = { products, status: 200 };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
