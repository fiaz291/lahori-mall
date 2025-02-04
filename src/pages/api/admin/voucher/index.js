import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return handlePost(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "PUT") {
    return handlePut(req, res);
  }else if (req.method === "DELETE") {
    return handleDelete(req, res);
  } else {
    res.setHeader("Allow", ["POST", "PUT" , "GET", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const handlePost = async (req,res)=>{
    try {
        const { code, amount, isActive, expiresAt, description, storeId } = req.body;

        const voucher = await prisma.voucher.create({
          data: {
            code,
            amount,
            isActive: isActive ?? true,
            expiresAt,
            description,
            storeId,
          },
        });

        return res.status(201).json(createResponse({data:voucher}));
      } catch (error) {
        return res.status(500).json(createResponse({ error: error.message }));
      }

}
const handleGet = async (req,res)=>{
    try {
        const { id } = req.query;

        if (id) {
          // Get a single voucher by ID
          const voucher = await prisma.voucher.findUnique({
            where: { id: parseInt(id) },
            include: { store: true, financialTransactions: true, userVouchers: true },
          });

          if (!voucher) {
            return res.status(404).json(createResponse({ error: "Voucher not found" }));
          }

          return res.status(200).json(createResponse({data:voucher}));
        } else {
          // Get all vouchers
          const vouchers = await prisma.voucher.findMany({
            include: { store: true },
          });

          return res.status(200).json(createResponse({data:vouchers}));
        }
      } catch (error) {
        return res.status(500).json(createResponse({ error: error.message }));
      }
}
const handlePut = async (req,res)=>{
    try {
        const { id } = req.query;
        const { code, amount, isActive, expiresAt, description, storeId } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Voucher ID is required" });
        }

        const updatedVoucher = await prisma.voucher.update({
          where: { id: parseInt(id) },
          data: {
            code,
            amount,
            isActive,
            expiresAt,
            description,
            storeId,
          },
        });

        return res.status(200).json(createResponse({data:updatedVoucher}));
      } catch (error) {
        return res.status(500).json(createResponse({ error: error.message }));
      }
}
const handleDelete = async (req,res)=>{
    try {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ error: "Voucher ID is required" });
        }

        const deletedVoucher = await prisma.voucher.delete({
          where: { id: parseInt(id) },
        });

        return res.status(200).json(createResponse({data:deletedVoucher}));
      } catch (error) {
        return res.status(500).json(createResponse({ error: error.message }));
      }
}
