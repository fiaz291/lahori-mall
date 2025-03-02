import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return handlePost(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const handlePost = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity || quantity < 1) {
    return res.status(400).json(createResponse({ error: "Invalid input" }));
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.inventory < quantity) {
      return res.status(404).json({ message: "Product not found or insufficient inventory" });
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: quantity,
        },
        include: {
          product: true,
        },
      });

      return res.status(200).json(createResponse({data:updatedCartItem}));
    } else {
      const newCartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
        include: {
          product: true,
        },
      });

      return res.status(201).json(createResponse({data:newCartItem}));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(createResponse({ error: "Internal Server Error" }));
  }
};

const handleGet = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json(createResponse({ error: "User ID is required" }));
  }

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: Number(userId) },
      include: {
        product: true,
      },
    });

    return res.status(200).json(createResponse({data:cartItems}));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createResponse({ error: "Internal Server Error" }));
  }
};

const handleDelete = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json(createResponse({ error: userId +"Invalid input"+productId }));
  }

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!cartItem) {
      return res.status(404).json(createResponse({ error: "Cart item not found" }));
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return res.status(204).json(createResponse({ message: "Cart item delete" }));
  
  } catch (error) {
    console.error(error);
    return res.status(500).json(createResponse({ error: "Internal Server Error" }));
  }
};
