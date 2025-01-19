import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";

export default async function handler(req, res) {
  switch (req.method) {
    
    case "POST":
      return POST(req, res);
    default:
      res.setHeader("Allow", ["POST", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
async function POST(req, res) {
  
    const { code,email } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
          });
          if(!user)
            return res.status(400).json(createResponse({ error: "User Not found", code: 2 }));
        console.log("user.code",user.code)
        if(user.code != code )
            return res.status(400).json(createResponse({ error: "Invalid verification code", code: 2 }));

        await prisma.user.update({
            where: { id:user.id },
            data:{
                isVerified:true
            }
          });
       return res.status(200).json({ success: true, message:"code verified" });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: error.response.data });
    }
}