// import { prisma } from "../../prisma";

import prisma from "@/app/prisma";
import { createResponse,excludeFields } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res)
    /* case "POST":
      return POST(req, res); */
    case "PATCH":
      return PATCH(req, res);
    default:
      res.setHeader("Allow", ["POST", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const GET = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id:parseInt(id)
      }
    });

    const data = { data: user, code: 200,status:true };
    if (user) {
      res.status(200).json(createResponse(data));
    } else {
      res.status(200).json(createResponse(data));
    }
  } catch (error) {
    res.status(500).json(createResponse({error: "Internal Server Error"}));
  }
};

/* const POST = async (req, res) => {
  const {
    username,
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
    vendorId
  } = req.body;

  // Required fields
  const requiredFields = { username, email, password, firstName, phoneNumber };

  // Check for missing required fields
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res
        .status(400)
        .json({ error: `${field} is required`, errorCode: 1 });
    }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already in use", errorCode: 2 });
    }

    const hashedPassword = await bcrypt.hash(
      `${password}${email.length.toString()}`,
      10
    );
    const newUser = await prisma.user.create({
      data: {
        username,
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
        vendorId
      },
    });
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );
    const data = { user: newUser, token, status: 201 };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", err: error });
  }
}; */

const PATCH = async (req, res) => {
  const {
    id,
    username,
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
        .json({ error: `${field} is required`, errorCode: 1 });
    }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(400).json({ error: "User Not found", errorCode: 2 });
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
      
    let newUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
    newUser = excludeFields(newUser,['password'])
    res.status(201).json(createResponse({ data: newUser, code: 201, status:true }));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", err: error });
  }
};
