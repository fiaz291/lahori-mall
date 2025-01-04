import prisma from "@/app/prisma";
import { orderStatuses } from "@/app/utils";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    case "GET":
      return handleGet(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const handlePost = async (req, res) => {
  const { userId, orderItems } = req.body;

  if (!userId || !Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json(createResponse({ error: "Invalid input" }));
  }

  try {
    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await prisma.$transaction(async (prisma) => {
      const createdOrder = await prisma.order.create({
        data: {
          userId,
          totalAmount,
          status: orderStatuses.pending.key,
          orderItems: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              slug: item.slug,
            })),
          },
        },
        include: {
          orderItems: true,
        },
      });

      const cartItemIds = orderItems.map((item) => item.cartId);
      await prisma.cartItem.deleteMany({
        where: {
          id: { in: cartItemIds },
        },
      });

      return createdOrder;
    });
    await Promise.all(orderItems.map((item) => {
      return updateProductTotalSold(item.productId,item.quantity);

    }));

    return res.status(201).json(createResponse({data:order}));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
async function updateProductTotalSold(productId, quantitySold) {
  try {
    // Update the totalSold count
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        totalSold: {
          increment: quantitySold, // Increment by the quantity sold
        },
      },
    });

    console.log("Product updated:", updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating totalSold:", error);
  }
}
const handleGet = async (req, res) => {
  const { userId, limit = 20, page = 1 } = req.query;
  const orderLimit = Number(limit);
  const orderPage = Number(page);
  const skip = (orderPage - 1) * orderLimit;
  if (!userId) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const totalOrders = await prisma.order.count({
      where: { userId: parseInt(userId) },
    });

    // Then, calculate the total number of pages
    const totalPages = Math.ceil(totalOrders / orderLimit);

    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      skip: skip,
      take: orderLimit,
    });

    return res.status(200).json(createResponse({ data:{orders,totalPages},status:true }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createResponse({ error: "Internal Server Error" }));
  }
};
