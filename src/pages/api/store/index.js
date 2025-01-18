import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createStore(req, res);
    case "GET":
      return getStores(req, res);
    case "PATCH":
      return updateStore(req, res);
    case "DELETE":
      return deleteStore(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PATCH", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Create a new store
const createStore = async (req, res) => {
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
    const existingstore = await prisma.store.findUnique({
      where: { email },
    });

    if (existingstore) {
      return res
        .status(400)
        .json({ error: "Email already in use", errorCode: 2 });
    }

    const newstore = await prisma.store.create({
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

    res.status(201).json(createResponse({ data:store, status: 201 }));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// Get all stores or a specific store by ID
const getStores = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const store = await prisma.store.findUnique({
        where: { id: parseInt(id) },
      });

      if (!store) {
        return res.status(404).json({ error: "store not found" });
      }

      return res.status(200).json(createResponse({ data:store }));
    }

    const stores = await prisma.store.findMany();
    res.status(200).json(createResponse({ data:stores }));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// Update an existing store
const updateStore = async (req, res) => {
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
    return res.status(400).json({ error: "store ID is required" });
  }

  try {
    const store = await prisma.store.findUnique({
      where: { id: parseInt(id) },
    });

    if (!store) {
      return res.status(404).json({ error: "store not found" });
    }

    const updatedstore = await prisma.store.update({
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

    res.status(200).json(createResponse({ store: updatedstore }));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// Delete a store
const deleteStore = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "store ID is required" });
  }

  try {
    const store = await prisma.store.findUnique({
      where: { id: parseInt(id) },
    });

    if (!store) {
      return res.status(404).json({ error: "store not found" });
    }

    await prisma.store.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json(createResponse({ message: "store deleted successfully" }));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};