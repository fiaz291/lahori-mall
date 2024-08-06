import prisma from "@/app/prisma";
import { orderStatuses } from "@/app/utils";

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
    return res.status(400).json({ message: "Invalid input" });
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

    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleGet = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
