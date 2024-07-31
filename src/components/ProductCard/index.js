import { COLORS } from "@/constants";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React from "react";
import "./styles.css";

export default function ProductCard({ title, isFavorite, price, image }) {
  return (
    <div className="product-card-width flex flex-col overflow-hidden rounded bg-[rgba(0,0,0,0.1)]">
      <div className="w-full product-card-image-height bg-[#fff000] mb-[10px]">
        <img src={image} className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-between p-[6px]">
        <div>{title}</div>
        {isFavorite ? (
          <div style={{ color: COLORS.red }}>
            {" "}
            <HeartFilled />
          </div>
        ) : (
          <div style={{ color: COLORS.red }}>
            {" "}
            <HeartOutlined />
          </div>
        )}
      </div>
      <div className="p-[6px]">Price: {price}</div>
    </div>
  );
}
