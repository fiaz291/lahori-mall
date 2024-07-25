import { COLORS } from "@/constants";
import React from "react";

export default function AppBanner() {
  return (
    <p
      className={
        "flex text-center w-full h-[150px] text-[25px] justify-center items-center"
      }
      style={{ background: COLORS.green }}
    >
      Download our new app today! <br />
      Dont miss our mobile-only offers and shop with Android Play.
    </p>
  );
}
