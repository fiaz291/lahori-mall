import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';
const includedRoutes = ['/api/admin/:path*', '/api/user/:path*'];

const pathToRegex = (route)=> {
    // Convert dynamic segments (e.g., ":path*") to regex patterns
    const regexString = route
      .replace(/\/:path\*/g, '/.*') // Handle ":path*" as a wildcard
      .replace(/:[^/]+/g, '[^/]+'); // Handle other dynamic segments like ":id"
    return new RegExp(`^${regexString}$`);
  }
  
const isPathIncluded = (path)=> {
    for (const route of includedRoutes) {
      const regex = pathToRegex(route);
      if (regex.test(path)) {
        return true; // Path matches the route pattern
      }
    }
    return false; // No matches found
  }
export const verifyToken = async (token, secret) => {
  const secretKey = new TextEncoder().encode(secret);

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // Contains the token's claims
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
export default function auth(req,res,next) {
    console.log("Auth called")
  const { pathname } = req.nextUrl;
  const token = req.headers.get('authorization')?.split(' ')[1];
   const excludedRoutes = ['/api/user/signup','/api/user/login','/api/user/verify-email','/api/user/socialSignin'];
  // Check if the requested path matches any excluded route
  const isExcluded = excludedRoutes.some(route => pathname === route);
  // If the route is excluded, allow the request to proceed
  if (isExcluded) {
    next(NextResponse.next());
  }

  if(!isPathIncluded(pathname))
    next(NextResponse.next());

  if (!token) {
    /* return next(NextResponse.next()); */
    return next(new NextResponse(JSON.stringify({ error: 'Authentication token is missing.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }));
  }

  try {
    /* const decoded = jwt.verify(token, process.env.JWT_SECRET); */
    verifyToken(token, process.env.JWT_SECRET).then((payload) => {
      console.log('Token Payload:', payload);
      req.nextUrl.searchParams.set('user', JSON.stringify(payload)); // Optionally pass user info
      next(NextResponse.next());
}).catch((error) => {
  console.error('Verification Error:', error.message);
  next(new NextResponse(JSON.stringify({ error: 'Invalid or expired token.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }));
});
    
  } catch (error) {
    next( new NextResponse(JSON.stringify({ error: 'Invalid or expired token.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }));
  }
}