import React from "react";

export default function Loader({ width, height }) {
  return (
    <img
      src="/logo-dark.png"
      className="w-[120px] h-[80px] animate-bounce"
      style={{ width: width, height: height }}
    />
  );
}
