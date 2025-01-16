import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

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
export const GET = async (req, res) => {
  try {
    let {limit = 20, page=1 } = req.query
  let products = await prisma.product.findMany({
    where: {
      isActive: true,
    inventory: {
      gt: 1,
    },
    freeDelivery:true
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    
  });
  if(!products.length){
    products = await prisma.product.findMany({
      where: {
        isActive: true,
        inventory: {
          gt: 1,
        }
      },
      take: limit,
    });
  }
    res.status(200).json(createResponse({ data:products, status: 200 }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};