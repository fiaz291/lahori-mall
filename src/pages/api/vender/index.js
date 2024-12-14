import prisma from "@/app/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createVendor(req, res);
    case "GET":
      return getVendors(req, res);
    case "PATCH":
      return updateVendor(req, res);
    case "DELETE":
      return deleteVendor(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PATCH", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Create a new vendor
const createVendor = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    country = "PK",
    companyName,
    taxId,
  } = req.body;

  // Required fields
  const requiredFields = { name, email, phoneNumber };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res
        .status(400)
        .json({ error: `${field} is required`, errorCode: 1 });
    }
  }

  try {
    const existingVendor = await prisma.vendor.findUnique({
      where: { email },
    });

    if (existingVendor) {
      return res
        .status(400)
        .json({ error: "Email already in use", errorCode: 2 });
    }

    const newVendor = await prisma.vendor.create({
      data: {
        name,
        email,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
        country,
        companyName,
        taxId,
      },
    });

    res.status(201).json({ vendor: newVendor, status: 201 });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// Get all vendors or a specific vendor by ID
const getVendors = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const vendor = await prisma.vendor.findUnique({
        where: { id: parseInt(id) },
      });

      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      return res.status(200).json({ vendor });
    }

    const vendors = await prisma.vendor.findMany();
    res.status(200).json({ vendors });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// Update an existing vendor
const updateVendor = async (req, res) => {
  const { id } = req.query;
  const {
    name,
    email,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    country,
    companyName,
    taxId,
  } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Vendor ID is required" });
  }

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: parseInt(id) },
    });

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const updatedVendor = await prisma.vendor.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
        country,
        companyName,
        taxId,
      },
    });

    res.status(200).json({ vendor: updatedVendor });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// Delete a vendor
const deleteVendor = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Vendor ID is required" });
  }

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: parseInt(id) },
    });

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    await prisma.vendor.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};