import { COLORS } from "@/constants";
import React from "react";

export default function AppBanner() {
  return (
    <div
      className="flex text-center w-full h-[150px] text-[20px] md:text-[25px] justify-center items-center px-4"
      style={{ background: "#CD2E3A" }}
    >
      <p className="w-full text-white">
        🌸 Big News, 🌸

        Hey there, fabulous fashionistas! ✨ We’ve got something special just for YOU!
      </p>
    </div>
  );
}
