// import { prisma } from "../../prisma";

import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


export const GET = async (req, res) => {
  try {
  const {query} = req.query;

    const products = await prisma.product.findMany({
      where: {
       categoryId: query.categoryId
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
    });

    const data = { products, status: 200 };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

