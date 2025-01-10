import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

// CORS Configuration
const allowedOrigins = ['*']; // Replace with your allowed origins


export function middleware(req) {
  const origin = req.headers.get('origin');

  // Check if the origin is allowed
  if (allowedOrigins.includes('*') || allowedOrigins.includes(origin) || !origin) {
    // Handle Preflight Request (OPTIONS)
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400', // Cache preflight response for 1 day
        },
        status: 204,
      });
    }

    // For other methods, attach CORS headers
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     // Now, call the auth function to check for authentication after setting CORS headers
    return response
  }

  // Reject requests from disallowed origins
  return new NextResponse('CORS not allowed for this origin', { status: 403 });
}
// export const verifyToken = async (token, secret) => {
//   const secretKey = new TextEncoder().encode(secret);

//   try {
//     const { payload } = await jwtVerify(token, secretKey);
//     return payload; // Contains the token's claims
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// };
// export function auth(req) {

//   const { pathname } = req.nextUrl;
//   const token = req.headers.get('authorization')?.split(' ')[1];
//    const excludedRoutes = ['/api/user/signup','/api/user/login'];

//   // Check if the requested path matches any excluded route
//   const isExcluded = excludedRoutes.some(route => pathname === route);

//   // If the route is excluded, allow the request to proceed
//   if (isExcluded) {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.next();
//     return new NextResponse(JSON.stringify({ error: 'Authentication token is missing.' }), {
//       status: 401,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   try {
//     /* const decoded = jwt.verify(token, process.env.JWT_SECRET); */
//     verifyToken(token, process.env.JWT_SECRET).then((payload) => {
//       console.log('Token Payload:', payload);
//       req.nextUrl.searchParams.set('user', JSON.stringify(payload)); // Optionally pass user info
//     return NextResponse.next();
// }).catch((error) => {
//   console.error('Verification Error:', error.message);
//   return new NextResponse(JSON.stringify({ error: 'Invalid or expired token.' }), {
//       status: 401,
//       headers: { 'Content-Type': 'application/json' },
//     });
// });
    
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: 'Invalid or expired token.' }), {
//       status: 401,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

/* export const config = {
  matcher: ['/api/admin/:path*','/api/user/:path*'], // Apply middleware to specific paths
}; */