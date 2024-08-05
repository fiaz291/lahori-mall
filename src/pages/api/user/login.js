import prisma from "@/app/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      where: { email },
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      `${password}${email.length.toString()}`,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
    );

    // Return the token
    res.status(200).json({ token, user: user });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: "Token has expired" });
      }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
