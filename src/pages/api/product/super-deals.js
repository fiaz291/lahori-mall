import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
export const GET = async (req, res) => {
  try {
    let {limit = 20, page=1} = req.query
    const products = await prisma.product.findMany({
      where: {
      isActive: true,
      inventory: {
        gt: 1,
      },
      isDiscount: true,
      discountPrice: {
        not: null,
      },
    },
    orderBy: {
      discountPrice: "desc",
    },
    take: limit,
  });


    res.status(200).json(createResponse({ data:products, status: 200 }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

