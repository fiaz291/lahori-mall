import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function Product_Route({ prod }) {
  return (
    <div className="flex w-full">
      <div className="flex gap-2 text-[#6e6e6e] items-center text-sm md:text-base lg:text-xl">
        <p>Home</p>
        <FaChevronRight />
        <p>{prod.category}</p>
        <FaChevronRight />
        <p>{prod.subCategory}</p>
        <FaChevronRight />
        <p className="text-[#3e3e3e] font-semibold">{prod.name}</p>
      </div>
    </div>
  );
}
