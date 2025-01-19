import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return handlepost(req, res);
    default:
      res.setHeader("Allow", ["POST", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

 async function handlepost(req, res) {

  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json(createResponse({ error: 'All fields are required.' }));
  }

  try {
    // Fetch user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select:{
        email:true,
        password:true
      }
    });

    if (!user) {

return res.status(404).json(createResponse({ error: 'User not found.' }));
    }

     // Reconstruct the input string used during hashing
      const inputToHash = `${oldPassword}${user.email.length.toString()}`;
    
      // Compare the provided plain password (after hashing) with the stored hash
      const isMatch = await bcrypt.compare(inputToHash, user.password);

    if (!isMatch) {
      return res.status(401).json(createResponse({ error: 'Old password is incorrect.' }));
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
          `${newPassword}${user.email.length.toString()}`,
          10
        );

    // Update password in the database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json(createResponse({ message: 'Password updated successfully.' }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createResponse({ error: 'Internal server error.' }));
  }
}
