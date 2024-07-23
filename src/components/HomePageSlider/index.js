import { COLORS } from "@/constants";
import React from "react";

export default function HomePageSlider() {
  return (
    <div className="flex flex-col w-full mt-[10px] mb-[10px] relative border-t-[12px] border-t-[#00803e]">
      <img src="/slide-1.webp" className="w-full max-h-[500px] object-cover" />
      <div className="flex items-center absolute right-10 bottom-10 gap-8">
        <div className="text-white text-[20px] shadow ">
          An exclusive selection of this season&apos;s trends.
        </div>

        <button
          className={`px-[6px] py-[2px] text-white text-[20px] rounded-lg w-[164px] h-[56px]`}
          style={{ background: COLORS.green }}
        >
          Shop Now
        </button>
      </div>
      <div
        className="h-[12px] bg-[#ee1d25]"
        style={{ boxShadow: "0 -45px 65px 80px #000" }}
      ></div>
    </div>
  );
}
