import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import EditForm from "./components/edit-form";

export default function UserProfile() {
  const user = {
    firstName: "Abdul",
    lastName: "Saboor",
    username: "abdulS",
    email: "abc@example.com",
    phoneNumber: "+92 12345678",
    address: "Shahdara",
    city: "Lahore",
    state: "Punjab",
    zipcode: "54950",
    country: "Pakistan",
    profilePicture: [
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  };

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
