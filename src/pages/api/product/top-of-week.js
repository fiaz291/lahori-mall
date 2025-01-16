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
    let {days, limit = 20, page} = req.query
    let daysAgo = new Date();
    if (days) daysAgo.setDate(daysAgo.getDate() - parseInt(days));

  let products = await prisma.product.findMany({
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
    },
    include: {
      orderItems: {
        select: {
          quantity: true,
        },
      },
    },
    take: limit,
  });

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
    res.status(200).json(createResponse({data:products}));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};





