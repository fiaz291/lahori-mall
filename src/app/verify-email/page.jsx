"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import config from "../config";
import { API_URLS } from "../apiUrls";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(null);
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
          setVerified(true);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setVerified(false);
        }
      } catch (err) {
        setVerified(false);
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
      <Navbar hideSlider topbar />
      <div className="flex justify-center mt-10">
        <img
          src="/logo-dark.png"
          className="w-[300px] h-[150px] cursor-pointer hover:opacity-80"
          onClick={() => {
            handleRedirect("/");
          }}
        />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-4 mx-14 gap-5 ">
          <h1 className="text-center text-[42px]">Verifying Email</h1>

          <section>
            {loading && <p>verifying your email .....</p>}
            {verified && <p>Email Varified. Redirecting to Login</p>}
            {verified === false && <p>Invalid Code or Code Expired</p>}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
