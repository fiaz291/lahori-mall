import { COLORS } from "@/constants";
import React from "react";

export default function AppBanner() {
  return (
    <div
      className="flex text-center w-full h-[150px] text-[20px] md:text-[25px] justify-center items-center px-4"
      style={{ background: COLORS.green }}
    >
      <p className="w-full">
        Download our new app today! <br className="block md:hidden" />
        Don&apos;t miss our mobile-only offers and shop with Android Play.
      </p>
    </div>
  );
}
