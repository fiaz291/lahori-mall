"use client";
import React, { useEffect, useState } from "react";

export default function useWindowSize() {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const updateDimensions = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
      if (window.innerWidth < 500) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    if (typeof window !== "undefined") {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateDimensions);
      }
    };
  }, []);

  return {
    width,
    height,
    isMobile,
  };
}
