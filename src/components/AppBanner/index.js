import { COLORS } from "@/constants";
import React from "react";

export default function AppBanner() {
  return (
    <p className={`text-center w-full`} style={{background: COLORS.green}}>
      Download our new app today! <br />
      Dont miss our mobile-only offers and shop with Android Play.
    </p>
  );
}
