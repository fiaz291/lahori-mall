"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import config from "../config";
import { API_URLS } from "../apiUrls";
import Loader from "@/components/Loader";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  console.log({email, code})
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function verifyUserEmail() {
      try {
        const res = await axios.post(config.url + API_URLS.USER_VERIFY_EMAIL, {
          email,
          code,
        });
        if (res.data.success) {
          message.success("Email Verified Successfully");
          router.push("/");
        }
      } catch (err) {
        console.log({ err });
      } finally {
        setLoading(false);
      }
    }
    if (email && code) {
      verifyUserEmail();
    }
  }, [email, code, router]);

  if (loading) {
    return (
      <div className="h-[100vh] width-[100vw] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div>asdasdsad</div>
    </div>
  );
}
