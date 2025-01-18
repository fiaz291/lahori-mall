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
    let {days, limit = 20, page=1, categoryId} = req.query
     // Convert query parameters to integers
     const pageNum = parseInt(page, 10);
     const limitNum = parseInt(limit, 10);
   
     // Calculate the number of items to skip
     const skip = (pageNum - 1) * limitNum;
    let daysAgo = new Date();
    if (days) daysAgo.setDate(daysAgo.getDate() - parseInt(days));

    let query = {
      isActive: true,
      inventory: {
        gt: 1,
      },
      orderItems: {
        some: {
          order: {
            createdAt: {
              gte: daysAgo,
            },
          },
        },
      },
    }
    if(categoryId){
      query = {...query,categoryId:Number(categoryId)}
    }
  let products = await prisma.product.findMany({
    where:query,
    include: {
      orderItems: {
        select: {
          quantity: true,
        },
      },
    },
    take: limitNum,
    skip, // Skip the first (pageNum - 1) * limitNum items
  });

  // Get total count of items (for pagination metadata)
const totalCount = await prisma.product.count({
  where: {
    isActive: true,
    inventory: {
      gt: 1,
    },
    orderItems: {
      some: {
        order: {
          createdAt: {
            gte: daysAgo,
          },
        },
      },
    },
  }
});
// Calculate total pages
const totalPages = Math.ceil(totalCount / limitNum);
  // Calculate the total quantity sold for each product
  const productsWithSales = products.map((product) => {
    const totalQuantitySold = product.orderItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return { ...product, totalQuantitySold };
  });

  productsWithSales.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);
  products = productsWithSales.slice(0, 20);
  
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
    res.status(200).json(createResponse({data:{
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





