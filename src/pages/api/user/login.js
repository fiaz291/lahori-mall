import prisma from "@/app/prisma";
import bcrypt from "bcrypt";
import { getToken } from "../../../utilities";

export default async function handler(req, res) {
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
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {email}
    });
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

     // Reconstruct the input string used during hashing
  const inputToHash = `${password}${email.length.toString()}`;

  // Compare the provided plain password (after hashing) with the stored hash
  const isMatch = await bcrypt.compare(inputToHash, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token

    const token = await getToken(user)
    await prisma.user.update({
      where: { id:user.id },
      data: {token},
    });

    // Return the token
    res.status(200).json({ user: { ...user,token } });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired" });
      }
    return res.status(500).json({ error: error });
  }
};
