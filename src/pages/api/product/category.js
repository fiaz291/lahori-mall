// import { prisma } from "../../prisma";

import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

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
  const {categoryId, subCategoryId, page = 1, limit = 10} = req.query;
      // Convert query parameters to integers
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
    
      // Calculate the number of items to skip
      const skip = (pageNum - 1) * limitNum;
  let query = {}
  if(categoryId){
    query={categoryId:Number(categoryId)}
  }

  if(subCategoryId){
    query={...query,subCategoryId:Number(subCategoryId)}
  }

    let products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
      take: limitNum,
      skip, // Skip the first (pageNum - 1) * limitNum items
    });
     // Get total count of items (for pagination metadata)
     const totalCount = await prisma.product.count({where: query});
     // Calculate total pages
    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json(createResponse({ data:{
      // Send the response with pagination metadata
      products,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: pageNum,
        pageSize: limitNum,
      }}}));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

