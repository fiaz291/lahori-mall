"use client";
import { COLORS } from "@/constants";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export default function ProductCard({ title, isFavorite, price, img_url }) {
  const [isFav, setIsFav] = useState(isFavorite);

  function toggleFav() {
    setIsFav((prev) => !prev);
  }

  return (
    <div className="w-[280px] min-w-[280px] flex flex-col border rounded border-[#525252] overflow-hidden cursor-pointer">
      <div
        className="w-full h-[300px] bg-cover bg-center mb-[10px]"
        style={{ backgroundImage: `url(${img_url})` }}
      ></div>
      <div
        className="flex flex-col gap-0"
        style={{ boxShadow: "0 0 50px 65px #000000" }}
      >
        <div className="flex justify-between px-[18px] mt-[-10px]">
          <div className="text-[17px] font-light text-[#eaeaea]">{title}</div>
          <div
            onClick={toggleFav}
            className={`${isFav ? "text-[#e11919]" : "text-[#eaeaea]"}`}
            style={{ fontSize: "22px", cursor: "pointer" }}
          >
            {isFav ? <HeartFilled /> : <HeartOutlined />}
          </div>
        </div>
        <div className="text-[22px] p-[18px] pt-0 text-[#eaeaea]">
          Rs. {price}
        </div>
      </div>
    </div>
  );
}
