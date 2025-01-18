import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  const { method } = req;
  const { productSlug } = req.query;
  switch (method) {
    case "GET":
      return Get(req, res, productSlug);
    case "PATCH":
      return PATCH(req, res, productSlug);
    case "DELETE":
      return DELETE(req, res, productSlug);
    case "PATCH":
      return PATCH(req, res, productSlug);
    default:
      res.setHeader("Allow", ["POST", "DELETE", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function Get(req, res, productSlug) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: productSlug,
        // isActive: true,
        inventory: {
          gt: 0,
        },
      },
      include: {
        category: {
          select: {
          slug: true, // Only select the slug from the category
          name: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(createResponse({data:product}));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
