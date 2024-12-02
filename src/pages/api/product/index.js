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
    freebieProductIDs = [],
    relatedProductIDs = [],
    totalSold = 0,
    isActive = true,
    subCategoryIds = [],
  } = req.body;

  // Required fields validation
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

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res
        .status(400)
        .json({ error: `${field} is required`, errorCode: 1 });
    }
  }

  try {
    // Check for unique fields
    const existingSlug = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res
        .status(400)
        .json({ error: "Slug already in use", errorCode: 2 });
    }

    const existingSku = await prisma.product.findUnique({
      where: { SKU },
    });

    if (existingSku) {
      return res
        .status(400)
        .json({ error: "SKU already in use", errorCode: 3 });
    }

    // Create the new product
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
        freebieProductIDs,
        relatedProductIDs,
        totalSold,
        isActive,
        subCategories: {
          connect: subCategoryIds.map((id) => ({ id })),
        },
      },
    });

    res.status(201).json({ product: newProduct, status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
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
    freebieProductIDs,
    relatedProductIDs,
    totalSold,
    isActive,
    subCategoryIds,
  } = req.body;

  // Ensure 'id' is provided
  if (!id) {
    return res.status(400).json({ error: "Product ID is required", errorCode: 1 });
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
        return res.status(400).json({ error: "Slug already in use", errorCode: 2 });
      }
    }

    // Check if the new SKU is already in use by another product
    if (SKU && SKU !== existingProduct.SKU) {
      const existingSku = await prisma.product.findUnique({
        where: { SKU },
      });

      if (existingSku) {
        return res.status(400).json({ error: "SKU already in use", errorCode: 4 });
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
    if (freebieProductIDs !== undefined) dataToUpdate.freebieProductIDs = freebieProductIDs;
    if (relatedProductIDs !== undefined) dataToUpdate.relatedProductIDs = relatedProductIDs;
    if (totalSold !== undefined) dataToUpdate.totalSold = totalSold;
    if (isActive !== undefined) dataToUpdate.isActive = isActive;

    // Handle updating subcategories relationship
    if (subCategoryIds !== undefined) {
      dataToUpdate.subCategories = {
        set: subCategoryIds.map((id) => ({ id })), // Replace existing relations with new ones
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });

    res.status(200).json({ product: updatedProduct, status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GET = async (req, res) => {
  try {
    const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query')
    let products = {
      new: [],
      onSale: [],
      topWeek: [],
    };
    const allProducts = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
    });

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

      const result = await innerHandlerForProducts(query);
      if (query === ENUMS.latest) {
        products.new = result;
      } else if (query === ENUMS.onSale) {
        products.onSale = result;
      } else if (query === ENUMS.topWeek) {
        if (result.length > 5) {
          products.topWeek = result;
        } else {
          const newArr = shuffleArray(allProducts);
          const splicedArray = newArr.splice(0, 20);
          products.topWeek = splicedArray;
        }
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
    // isActive: true,
    // inventory: {
    //   gt: 0,
    // },
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
      // isActive: true,
      // inventory: {
      //   gt: 0,
      // },
      // isDiscount: true,
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
      // isActive: true,
      // inventory: {
      //   gt: 1,
      // },
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
    take: 20,
  });

  // Calculate the total quantity sold for each product
  const productsWithSales = products.map((product) => {
    const totalQuantitySold = product.orderItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return { ...product, totalQuantitySold };
  });

  productsWithSales.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);
  const topProducts = productsWithSales.slice(0, 20);
  return topProducts;
};
