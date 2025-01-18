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
    let {limit = 20, page=1, categoryId } = req.query
     // Convert query parameters to integers
     const pageNum = parseInt(page, 10);
     const limitNum = parseInt(limit, 10);
   
     // Calculate the number of items to skip
     const skip = (pageNum - 1) * limitNum;

     let query = {
      isActive: true,
    inventory: {
      gt: 1,
    },
    freeDelivery:true
    }
     if(categoryId){
      query = {...query,categoryId:Number(categoryId)}
    }
  let products = await prisma.product.findMany({
    where: query,
    orderBy: {
      createdAt: "desc",
    },
     take: limitNum,
    skip, // Skip the first (pageNum - 1) * limitNum items
    
  });

// Get total count of items (for pagination metadata)
const totalCount = await prisma.product.count({
  where: query,
  orderBy: {
    createdAt: "desc",
  },
});
// Calculate total pages
const totalPages = Math.ceil(totalCount / limitNum);

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
    res.status(200).json(createResponse({ data:{
      products,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: pageNum,
        pageSize: limitNum,
      }
    }}));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};