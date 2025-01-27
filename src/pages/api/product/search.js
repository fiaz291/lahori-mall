
import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return searchProductByName(req, res);

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function searchProductByName(req, res) {
  try {
    let {text} = req.query
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: text, // Match at the start
              mode: 'insensitive',    // Case-insensitive
            },
          },
          {
            name: {
              contains: text, // Match in the middle
              mode: 'insensitive',   // Case-insensitive
            },
          },
          {
            name: {
              endsWith: text, // Match at the end
              mode: 'insensitive',   // Case-insensitive
            },
          },
        ],
      },
    });
    return res.status(200).json(createResponse({data:products}));
  } catch (error) {
    console.error('Error searching for product:', error);
    return res.status(500).json(createResponse({error}));
  }
}