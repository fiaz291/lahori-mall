import { createResponse, getToken } from "@/utilities";
import prisma from "@/app/prisma";
import axios from "axios";

export default async function handler(req, res) {
    /*  await cors(req, res); // Run the CORS middleware */
     switch (req.method) {
       case "POST":
         return socialSignin(req, res);
       default:
         res.setHeader("Allow", ["POST"]);
         return res.status(405).end(`Method ${req.method} Not Allowed`);
     }
   }

 async function socialSignin(req, res) {
  const { provider, dataSet } = req.body;

  try {
    let userObj;
    if (provider === "google") {
      const { data } = await getGoogleToken(dataSet.code)
      if(!data)
        return res.status(500).json({ error: "Error while getting google user data" });
      userObj = {socialId: data.sub ,firstName: data.given_name,lastName:data.family_name , email: data.email, profilePicture: {url:data.picture} };
    } else if (provider === "facebook") {
      userObj = {socialId: dataSet.id ,firstName: dataSet.first_name,lastName:dataSet.last_name , email: dataSet.email, profilePicture: {url:dataSet?.picture?.data?.url} };
    }  else {
      return res.status(400).json({ error: "Invalid provider" });
    }

    let user = await prisma.user.findUnique({ where: { email: userObj.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          ...userObj,
          isVerified:true,
          password:"ASSQWSDASDSADZXCZXCEQE@#@#@!@!WAS@!#@#"
        }
      });
    }

    const token = await getToken(user)
    await prisma.user.update({
      where: { id:user.id },
      data: {token},
    });
    delete user.password
    // Return the token
    res.status(200).json(createResponse({ data: { ...user,token }, status:true }));
  } catch (error) {
    console.error("Error in social login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getGoogleToken (code){
    try {
      
      // Exchange the code for an access token
      const { data } = await axios.post("https://oauth2.googleapis.com/token", null, {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: "http://localhost:3000",
          grant_type: "authorization_code",
          code,
        },
      });
       if(!data?.access_token)
        throw ("Erorr while gettig google Token")
      // Fetch user details from Google API
      return await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${data?.access_token}` },
      });
  
    } catch (error) {
      console.error("Google authentication error:", error);
      throw ("Google authentication error:",error)
    }
  }
  
