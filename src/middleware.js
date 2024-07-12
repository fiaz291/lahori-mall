import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request) {
  console.log({ request }, "111111111111111111111111111111");
  const debugInfo = {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),

  };

  
  // Return the debug info for now to see the request details
  // return new NextResponse(JSON.stringify({ message: "Debug Info", debugInfo }), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
//   const token = request.headers.get("authorization")?.split(" ")[1];

//   if (!token) {
//     return new NextResponse(JSON.stringify({ error: "Token is required" }), {
//       status: 401,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   try {
//     const secret = process.env.JWT_SECRET;
//     jwt.verify(token, secret);

//     // Token is valid, allow the request to proceed
    // return NextResponse.next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return new NextResponse(JSON.stringify({ error: "Token has expired" }), {
//         status: 401,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     }
//     return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
//       status: 403,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
}

// Limit middleware to paths starting with `/api/`
// export const config = {
//   matcher: "/api/:path*",
// };
