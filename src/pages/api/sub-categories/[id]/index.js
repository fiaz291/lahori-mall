import prisma from "@/app/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    case "GET":
      return GET(req, res);
    case "PUT":
      return PUT(req, res);
    case "PATCH":
      return PATCH(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// POST: Add a new subcategory
async function POST(req, res) {
  const { name, slug, url, categoryId } = req.body;

  if (!name || !slug || !url || !categoryId) {
    return res
      .status(400)
      .json({
        message: "All fields are required: name, slug, url, categoryId",
      });
  }

  try {
    // Check if the main category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Create the new subcategory
    const subCategory = await prisma.subCategory.create({
      data: {
        name,
        slug,
        url,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return res.status(201).json({data:subCategory});
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
// PUT: Upate a new subcategory
async function PUT(req, res) {
  const { name, slug, url, categoryId } = req.body;

  if (!name || !slug || !url || !categoryId) {
    return res
      .status(400)
      .json({
        message: "All fields are required: name, slug, url, categoryId",
      });
  }

  try {
    // Check if the main category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update subcategory
    const subCategory = await prisma.subCategory.update({
      where: { id: parseInt(categoryId) },
      data: {
        name,
        slug,
        url,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return res.status(201).json(subCategory);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
// PATCH: Update subcategory
async function PATCH(req, res) {
  const { name, slug, url, categoryId } = req.body;

  if (!name || !slug || !url || !categoryId) {
    return res
      .status(400)
      .json({
        message: "All fields are required: name, slug, url, categoryId",
      });
  }

  try {
    // Check if the main category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update subcategory
    const subCategory = await prisma.subCategory.update({
      where: { id: parseInt(categoryId) },
      data: {
        name,
        slug,
        url,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return res.status(201).json(subCategory);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// GET: Fetch all subcategories (optional implementation)
async function GET(req, res) {
  let { id } =  req.query
  try {
    let subCategories = await prisma.subCategory.findMany({where:{categoryId:parseInt(id)}});
    if (subCategories) {
      subCategories = subCategories.map((sub)=>({label:sub.name,value:sub.id}))
    }
    return res.status(200).json({data:subCategories});
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
