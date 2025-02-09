import prisma from '@/app/prisma';
import { createResponse } from '@/utilities';


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

 async function handlePost(req, res) {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json(createResponse({ error: 'userId and productId are required' }));
    }

    try {
      // Add the new view
      await prisma.views.create({
        data: {
          userId:Number(userId),
          productId:Number(productId),
        },
      });

      // Ensure only the last 10 views are kept for the user
      const userViews = await prisma.views.findMany({
        where: { userId:Number(userId) },
        orderBy: { viewedAt: 'desc' },
        skip: 10, // Skip the first 10 most recent views
      });

      // Delete older views
      const deleteIds = userViews.map((view) => view.id);
      if (deleteIds.length > 0) {
        await prisma.view.deleteMany({
          where: { id: { in: deleteIds } },
        });
      }

      res.status(201).json(createResponse({ message: 'View added successfully' }));
    } catch (error) {
      console.error('Error adding view:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

 async function handleGet(req, res) {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
  
    try {
      // Fetch the last 10 viewed products for the user
      const views = await prisma.views.findMany({
        where: { userId: parseInt(userId, 10) },
        orderBy: { viewedAt: 'desc' },
        take: 10,
        include: {
          product: true, // Include product details if needed
        },
      });
  
      res.status(200).json(createResponse({ data:views }));
    } catch (error) {
      console.error('Error fetching views:', error);
      res.status(500).json({ message: 'Internal Server Error',error });
    }
  }
