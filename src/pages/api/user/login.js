import prisma from "@/app/prisma";
import bcrypt from "bcrypt";
/* import Cors from 'cors'; */
import { createResponse, getToken, cordMiddleware } from "../../../utilities";

/* const cors = cordMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
    origin: '*', // Allow all origins. Replace with a specific origin in production.
  })
); */
export default async function handler(req, res) {
 /*  await cors(req, res); // Run the CORS middleware */
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const POST = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json(createResponse({ error: "Email and password are required" , status:false }));
  }

  try {
    const user = await prisma.user.findUnique({
      where: {email}
    });
    // Check if the user exists
    if (!user) {
      return res.status(401).json(createResponse({ error: "Invalid email or password", status:false }));
    }

    if (!user.isVerified) {
      return res.status(401).json(createResponse({ error: "Email is not verified", status:false }));
    }

     // Reconstruct the input string used during hashing
  const inputToHash = `${password}${email.length.toString()}`;

  // Compare the provided plain password (after hashing) with the stored hash
  const isMatch = await bcrypt.compare(inputToHash, user.password);
    if (!isMatch) {
      return res.status(401).json(createResponse({ error: "Invalid email or password", status:false }));
    }

    // Generate a JWT token

    const token = await getToken(user)
    await prisma.user.update({
      where: { id:user.id },
      data: {token},
    });
    delete user.password
    // Return the token
    res.status(200).json(createResponse({ data: { ...user,token }, status:true }));
  } catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired" });
      }
    return res.status(500).json(createResponse({ error: error, status:false }));
  }
};
