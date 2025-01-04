// import { prisma } from "../../prisma";

import prisma from "@/app/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const GET = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 50;
  const skip = (page - 1) * limit;

  try {
    // const users = await prisma.admin.findMany({
    //   skip: skip,
    //   take: limit,
    //   where: {
    //     role: {
    //       not: "customer",
    //     },
    //   },
    // });
    const users = await prisma.admin.findMany({
        skip: skip,
        take: limit,
      });

    const data = { users: users, count: users.length, status: 200 };
    if (users && users.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
