import prisma from "@/pages/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handlePost(req, res);
  } else if (req.method === 'GET') {
    return handleGet(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const handlePost = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.inventory < quantity) {
      return res.status(404).json({ message: 'Product not found or insufficient inventory' });
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
          quantity: existingCartItem.quantity + quantity,
        },
      });

      return res.status(200).json(updatedCartItem);
    } else {
      const newCartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });

      return res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleGet = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: Number(userId) },
      include: {
        product: true,
      },
    });

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
