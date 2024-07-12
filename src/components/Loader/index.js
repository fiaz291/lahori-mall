import React from "react";

export default function Loader({ width, height }) {
  return (
    <img
      src="/logo.png"
      className="w-[80px] h-[80px] animate-bounce"
      style={{ width: width, height: height }}
    />
  );
}
