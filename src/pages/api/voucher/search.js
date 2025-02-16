
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
    const voucher = await prisma.voucher.findUnique({
      where: {
        code:text
    }});
    return res.status(200).json(createResponse({data:voucher}));
  } catch (error) {
    console.error('voucher not found:', error);
    return res.status(500).json(createResponse({error}));
  }
}