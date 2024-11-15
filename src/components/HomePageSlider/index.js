import useWindowSize from "@/app/hooks/windowSize";
import { COLORS } from "@/constants";
import React from "react";

export default function HomePageSlider() {
  const { isMobile } = useWindowSize();
  return (
    <div className="w-full mt-[10px] mb-[10px] relative">
      <img src="/slide-1.webp" className="w-full max-h-[400px] object-cover" />
      <div className="flex items-center absolute right-10 bottom-10 gap-4">
        <div
          className={`text-white ${
            isMobile ? "text-[14px]" : "text-[20px]"
          } shadow bg-[rgba(0,0,0,0.6)] p-[10px]`}
        >
          An exclusive selection of this season's trends.
        </div>

        <button
          className={`pl-[6px] pr-[6px] pt-[2px] pb-[2px] text-white ${
            isMobile ? "text-[10px]" : "text-[20px]"
          } rounded ${isMobile ? "w-[80px] h-[40px]" : "w-[164px] h-[62px]"}`}
          style={{ background: COLORS.green }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
