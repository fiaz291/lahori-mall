import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    case "GET":
      return handleGet(req, res);
    case "DELETE":
      return handleDelte(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Handle POST request to add a favorite
const handlePost = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res
      .status(400)
      .json(createResponse({ error: "User ID and Product ID are required" }));
  }

  try {
    // Add to favorites
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        productId,
      },
    });

    return res.status(201).json(createResponse({data:favorite}));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createResponse({ message: "Internal Server Error",error }));
  }
};

// Handle GET request to retrieve user favorites
const handleGet = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json(createResponse({ error: "User ID is required" }));
  }

  try {
    // Fetch user's favorite products
    const favorites = await prisma.favorite.findMany({
      where: { userId: parseInt(userId, 10) },
      include: {
        product: true,
      },
    });

    return res.status(200).json(createResponse({data:favorites}));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createResponse({ message: "Internal Server Error",error }));
  }
};
// Handle DELETE request to retrieve user favorites
const handleDelte = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json(createResponse({ error: "ID is required" }));
  }

  try {
    // Fetch user's favorite products
    const favorites = await prisma.favorite.delete({
      where: { 
        id: parseInt(id, 10)
      }
    });

    return res.status(200).json(createResponse({message:"Item removed"}));
  } catch (error) {
    return res.status(500).json(createResponse({ message: "Internal Server Error",error }));
  }
};