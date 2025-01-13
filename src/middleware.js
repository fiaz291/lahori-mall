import { NextResponse } from "next/server";
import auth from "@/utilities/auth"
import cors from "@/utilities/cors"
import {runMiddleware} from "@/utilities"

export async function middleware (req,res) {
  return runMiddleware(req,res, [cors,auth]);
 // Continue for all other routes
  }
