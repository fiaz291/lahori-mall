
import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return searchUserByName(req, res);

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function searchUserByName(req, res) {
  try {
    let {text} = req.query
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              startsWith: text, // Match at the start
              mode: 'insensitive',    // Case-insensitive
            },
          },
          {
            firstName: {
              contains: text, // Match in the middle
              mode: 'insensitive',   // Case-insensitive
            },
          },
          {
            firstName: {
              endsWith: text, // Match at the end
              mode: 'insensitive',   // Case-insensitive
            },
          },
        ],
      },
    });
    return res.status(200).json(createResponse({data:user}));
  } catch (error) {
    console.error('Error searching for product:', error);
    return res.status(500).json(createResponse({error}));
  }
}