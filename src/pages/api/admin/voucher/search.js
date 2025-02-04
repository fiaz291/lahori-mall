
import { ENUMS } from "@/app/utils";
import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return searchVoucherByName(req, res);

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function searchVoucherByName(req, res) {
  try {
    let {text} = req.query
    const user = await prisma.user.findMany({
      where: {
        code:text
    }});
    return res.status(200).json(createResponse({data:user}));
  } catch (error) {
    console.error('Error searching for product:', error);
    return res.status(500).json(createResponse({error}));
  }
}