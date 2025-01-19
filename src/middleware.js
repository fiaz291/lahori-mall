import { NextResponse } from "next/server";
import auth from "@/utilities/auth"
import cors from "@/utilities/cors"
import {runMiddleware} from "@/utilities"

export async function middleware (req,res) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400', // Cache preflight response for 1 day
      },
      status: 204,
    })
  }
  return runMiddleware(req,res, [cors,auth]);
 // Continue for all other routes
  }
