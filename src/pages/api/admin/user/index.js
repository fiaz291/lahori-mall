// import { prisma } from "../../prisma";

import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    case "PATCH":
      return PATCH(req, res);
    default:
      res.setHeader("Allow", ["POST", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const POST = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    country = "PK",
    dateOfBirth,
    storeId
  } = req.body;

  // Required fields
  const requiredFields = { email, password, firstName };

  // Check for missing required fields
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res
        .status(400)
        .json(createResponse({ error: `${field} is required`, code: 1, status:false }));
    }
  }

  try {
    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json(createResponse({ error: "Email already in use", code: 2, status:false }));
    }

    const hashedPassword = await bcrypt.hash(
      `${password}${email.length.toString()}`,
      10
    );
    const newUser = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        storeId,
        isActive:true
      },
    });
    delete newUser.password
    res.status(201).json(createResponse({ data: {...newUser}, status: true }));
  } catch (error) {
    res.status(500).json(createResponse({ error: "Internal Server Error", status:false }));
  }
};

const PATCH = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    role,
    country = "PK",
    vendorId
  } = req.body;

  // Required fields
  const requiredFields = { id };

  // Check for missing required fields
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res
        .status(400)
        .json(createResponse({ error: `${field} is required`, code: 1, status:fasle }));
    }
  }

  try {
    const existingUser = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(400).json(createResponse({ error: "User Not found", code: 2, status:false }));
    }

    const dataToUpdate = {};
    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (role) dataToUpdate.role = role;
    if (address) dataToUpdate.address = address;
    if (city) dataToUpdate.city = city;
    if (state) dataToUpdate.state = state;
    if (zipCode) dataToUpdate.zipCode = zipCode;
    if (country) dataToUpdate.country = country;
    if (phoneNumber) {
      dataToUpdate.phoneNumber = phoneNumber;
      dataToUpdate.isVerified = false;
    }
    if (vendorId) dataToUpdate.vendorId = vendorId
      
    const newUser = await prisma.admin.update({
      where: { id },
      data: dataToUpdate,
    });
    res.status(201).json(createResponse({ data: newUser, status: true }));
  } catch (error) {
    res.status(500).json(createResponse({ error: "Internal Server Error",status:false }));
  }
};
