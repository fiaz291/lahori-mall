"use client";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import React, { useState } from "react";

export default function ProductCard({ product }) {
  const [isFav, setIsFav] = useState(product.isFavorite);

  function toggleFav() {
    setIsFav((prev) => !prev);
  }

  function renderStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} color="#ffaf36" />);
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(<FaStarHalfAlt key={i} color="#ffaf36" />);
      } else {
        stars.push(<FaRegStar key={i} color="#ffaf36" />);
      }
    }
    return stars;
  }

  return (
    <div className="w-[279px] min-w-[279px] flex flex-col border rounded-md border-[#525252] overflow-hidden cursor-pointer hover:shadow-sm hover:shadow-[#ffffffd0]">
      <div
        className="w-full h-[280px] bg-cover bg-center mb-[8px]"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        {product.onSale && (
          <div className="bg-red-600 p-2 w-[50px] ml-2 rounded-b-xl shadow-md shadow-[#00000071]">
            <h1 className="text-[12px] text-white">Sale</h1>
          </div>
        )}
      </div>
      <div
        className="flex flex-col gap-2"
        style={{ boxShadow: "0 0 50px 65px #000000" }}
      >
        <div className="flex items-center px-[14px] mt-[-8px] gap-1">
          {renderStars(product.rating)}
        </div>
        <div className="flex justify-between px-[14px]">
          <div className="text-[18px] h-[24px] font-light overflow-hidden text-[#eaeaea]">
            {product.name}
          </div>
          <div
            onClick={toggleFav}
            className={`px-[2px] ${
              isFav ? "text-[#e11919]" : "text-[#eaeaea]"
            }`}
            style={{ fontSize: "20px", cursor: "pointer" }}
          >
            {isFav ? <HeartFilled /> : <HeartOutlined />}
          </div>
        </div>
        <div className="flex gap-3 items-end p-[14px] mt-[-8px] pt-0 text-[#eaeaea]">
          <p className="text-[20px]">Rs. {product.price}</p>
          {product.onSale && (
            <p className="text-[16px] text-[#c6c6c6] line-through">
              Rs. {product.oldPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
