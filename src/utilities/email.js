import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

export async function verificationEmail(email) {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } 
    let code = Math.floor(10000 + Math.random() * 90000).toString();

    // Save token and expiry in the database
    await prisma.user.update({
      where: { email },
      data: {
        code: code
      },
    });

    // Send email
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?code=${code}&email=${email}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    return { message: 'Verification email sent' };
  } catch (error) {
    console.error(error);
    return { error: 'Internal server error' };
  }
}
