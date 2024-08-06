"use client";
import { COLORS } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";

export default function ManageAccComponent({ user }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-lg sm:text-xl md:text-2xl">Manage My Account</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4  p-4 border border-[#3a3a3a] flex-1">
          <h3 className="text-sm sm:text-base">Personal Profile</h3>
          <div className="flex flex-col gap-1">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4  p-4 border border-[#3a3a3a] flex-1">
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base">Address Book</h3>
              <button
                className="border-0 text-xs sm:text-sm text-white pl-4 pr-4 pt-2 pb-2 rounded"
                style={{ background: COLORS.green }}
                onClick={() => {
                  router.push("/edit-profile");
                }}
              >
                Edit
              </button>
            </div>
            <p className="text-[#919191] text-xs font-semibold">
              DEFAULT SHIPPING ADDRESS
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-bold">{user?.name}</p>
              <p className="font-extralight">
                {user?.address} {user?.city} {user?.state} {user?.country}{" "}
                {user?.zipCode}
              </p>
              {/* <p className="font-extralight">{address[1]}</p> */}
              <p className="font-semibold">Phone Number: </p>
              <p className="font-extralight">{user?.phoneNumber}</p>
            </div>
          </div>
          <div className="w-px bg-[#3a3a3a] hidden md:block"></div>
          <div className="flex flex-col gap-4 md:flex-1">
            <h3 className="text-sm sm:text-base">{"\u00A0"}</h3>
            <p className="text-[#bbbbbb] text-xs font-light">
              DEFAULT SHIPPING ADDRESS
            </p>
            <div className="flex flex-col gap-1">
              {/* <p className="font-bold">{name}</p>
              <p className="font-extralight">{address[0]}</p>
              <p className="font-extralight">{address[1]}</p>
              <p className="font-extralight">{contact}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
