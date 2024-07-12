import { COLORS } from "@/constants";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React from "react";

export default function ProductCard({ title, isFavorite, price }) {
  return (
    <div className="w-[280px] flex flex-col border rounded border-[#a6a7ab] overflow-hidden">
      <div className="w-full h-[200px] bg-[#fff000] mb-[10px]"></div>
      <div className="flex justify-between p-[6px]">
        <div>{title}</div>
        {isFavorite ? (
          <div style={{color: COLORS.red}}>
            {" "}
            <HeartFilled />
          </div>
        ) : (
          <div style={{color: COLORS.red}}>
            {" "}
            <HeartOutlined />
          </div>
        )}
      </div>
      <div className="p-[6px]">Price: {price}</div>
    </div>
  );
}
