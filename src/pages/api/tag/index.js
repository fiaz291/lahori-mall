import prisma from "@/app/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req, res) {
  const { tag, page = 1, limit = 1, minPrice, maxPrice } = req.query;
  const minPriceInt = Number(minPrice);
  const maxPriceInt = Number(maxPrice);
  const orderLimit = Number(limit);
  const orderPage = Number(page);
  const skip = (orderPage - 1) * orderLimit;

  if (!tag) {
    return res.status(400).json({ error: "Tag is required" });
  }

  try {
    const priceFilter = {};

    if (minPriceInt) {
      priceFilter.gte = Number(minPriceInt);
    }

    if (maxPriceInt) {
      priceFilter.lte = Number(maxPriceInt);
    }

    const products = await prisma.product.findMany({
      where: {
        tags: {
          has: tag,
        },
        ...(Object.keys(priceFilter).length > 0 && { price: priceFilter }),
      },
      take: orderLimit,
      skip: skip,
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by tag:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
