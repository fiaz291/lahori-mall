"use client"
import React from "react";
import Navbar from "@/components/Navbar";
import EditForm from "./components/edit-form";
import Footer from "@/components/Footer";
import useAuthUser from "../hooks/authUser";

export default function UserProfile() {
  const { user } = useAuthUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 p-10 gap-5">
          <p className="font-bold text-xl">Edit Profile</p>
          <EditForm user={user} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
