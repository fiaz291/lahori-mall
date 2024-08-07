// import { prisma } from "../../prisma";

import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";

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
    slug,
    score,
    discountPrice,
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
        isDiscount: !!discountPrice,
        score,
        discountPrice,
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
    discountPrice,
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
    if (discountPrice !== undefined) dataToUpdate.discountPrice = discountPrice;

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

export const GET = async (req, res) => {
  try {
    const { value } = req.query;
    let products;
    if (value) {
      products = await innerHandlerForProducts(value);
    } else {
      products = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc", // Order by createdAt in descending order
        },
      });
    }

    const data = { products, status: 200 };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const innerHandlerForProducts = async (value) => {
  switch (value) {
    case ENUMS.latest:
      return getLatestProducts();
    case ENUMS.onSale:
      return getLatestDiscountedProducts();
    case ENUMS.topWeek:
      return getTopSellingProductsLast30Days();
    default:
      return [];
  }
};

const getLatestProducts = async () => {
  const products = await prisma.product.findMany({
    isActive: true,
    inventory: {
      gt: 0,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
  return products;
};

const getLatestDiscountedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      inventory: {
        gt: 0,
      },
      isDiscount: true,
      discountPrice: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
  return products;
};

const getTopSellingProductsLast30Days = async () => {
  const date30DaysAgo = new Date();
  date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      inventory: {
        gt: 1,
      },
      orderItems: {
        some: {
          order: {
            createdAt: {
              gte: date30DaysAgo,
            },
          },
        },
      },
    },
    include: {
      orderItems: {
        select: {
          quantity: true,
        },
      },
    },
  });

  const productSales = products.map((product) => ({
    ...product,
    totalSales: product.orderItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),
  }));

  productSales.sort((a, b) => b.totalSales - a.totalSales);

  return productSales.slice(0, 20);
};
