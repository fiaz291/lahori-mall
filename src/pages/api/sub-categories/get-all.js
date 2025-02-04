import { ENUMS } from "@/app/utils";
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
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page

    // Convert query parameters to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Calculate the number of items to skip
    const skip = (pageNum - 1) * limitNum;
    let query = {
    };
    const subCategories = await prisma.subCategory.findMany({
      where: query,
      take: limitNum,
      skip,
    });

    // Get total count of items (for pagination metadata)
    const totalCount = await prisma.subCategory.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json(
      createResponse({
        data: {
          // Send the response with pagination metadata
          subCategories,
          pagination: {
            totalItems: totalCount,
            totalPages,
            currentPage: pageNum,
            pageSize: limitNum,
          },
        },
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
