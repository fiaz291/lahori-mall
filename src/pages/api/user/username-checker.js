// import { prisma } from "../../prisma";
import prisma from "@/pages/prisma";

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
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      const suggestedUsernames = await generateSuggestedUsernames(username);
      return res
        .status(200)
        .json({
          error: "Username already in use",
          suggestions: suggestedUsernames,
          status: 200,
        });
    }

    return res.status(200).json({ message: "Username is available" });
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateSuggestedUsernames = async (username) => {
  const suggestions = [];
  let count = 1;

  while (suggestions.length < 5) {
    const newUsername = `${username}${count}`;
    const existingUser = await prisma.user.findUnique({
      where: { username: newUsername },
    });

    if (!existingUser) {
      suggestions.push(newUsername);
    }

    count++;
  }

  return suggestions;
};
