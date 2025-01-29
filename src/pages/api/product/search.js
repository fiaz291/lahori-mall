
import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return searchProductByName(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function searchProductByName(req, res) {
  try {
    let {text,page = 1, limit = 10} = req.query
    // Convert query parameters to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
  
    // Calculate the number of items to skip
    const skip = (pageNum - 1) * limitNum;

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
      take: limitNum,
      skip, // Skip the first (pageNum - 1) * limitNum items
    });

    // Get total count of items (for pagination metadata)
    const totalCount = await prisma.product.count({
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
    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limitNum);
    return res.status(200).json(createResponse({ data:{
      // Send the response with pagination metadata
      products,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: pageNum,
        pageSize: limitNum,
      }}}));
  } catch (error) {
    console.error('Error searching for product:', error);
    return res.status(500).json(createResponse({error}));
  }
}