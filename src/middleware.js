import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request) {
  const debugInfo = {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),

  };
}
/* export function middleware(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ error: 'Authentication token is missing.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.nextUrl.searchParams.set('user', JSON.stringify(decoded)); // Optionally pass user info
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Invalid or expired token.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  matcher: ['/api/admin/:path*'], // Apply middleware to specific paths
}; */