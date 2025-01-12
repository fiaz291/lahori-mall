import prisma from "@/app/prisma";
import { createResponse } from "@/utilities";
import axios from "axios";


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
  
    const { phoneNumber, id  } = req.body;

    try {
        let code = Math.random(5)
        /* const newUser = await prisma.user.update({
            where: { id },
            data: {verificationCode:code},
          });
          if(!newUser)
            return res.status(400).json(createResponse({ error: "User Not found", code: 2 })); */
      const response = await axios.post(
        `https://graph.facebook.com/v17.0/${process.env.WHATS_APP_NUMBER}/messages`,
        {
            "messaging_product": "whatsapp",
            "to": phoneNumber,
            "type": "text",
            "text": {
              "body": `Your verification code is ${code}`
            }
          },
          
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATS_APP_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json(createResponse({ success: true, data: response.data }));
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json(createResponse({ success: false, error: error.response.data }));
    }
    /* {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: 'your_template_name',
            language: { code: 'en_US' },
          },
        }, */
}
 