import Cors from 'cors';
import { NextResponse } from "next/server";
/* const cors = Cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
}); */
const allowedOrigins = ["*"]
const cors = (req,res,next)=>{
    const origin = req.headers.get('origin');
      // Check if the origin is allowed
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin) || !origin) {
        // Handle Preflight Request (OPTIONS)
        if (req.method === 'OPTIONS') {
          const re = new Response(null, {
            headers: {
              'Access-Control-Allow-Origin': origin || '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              'Access-Control-Max-Age': '86400', // Cache preflight response for 1 day
            },
            status: 204,
          })
            next(re)
        }
    
        // For other methods, attach CORS headers
        const response = NextResponse.next();
        response.headers.set('Access-Control-Allow-Origin', origin || '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
         // Now, call the auth function to check for authentication after setting CORS headers
         next(response)
      }
      next(new NextResponse('CORS not allowed for this origin', { status: 405 }))
      // Reject requests from disallowed origins
    }


export default cors;