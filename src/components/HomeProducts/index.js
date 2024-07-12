import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React from "react";
import ProductCard from "../ProductCard";

const products = [
  {
    title: "product 1",
    price: "160",
    isFavorite: false,
  },
  {
    title: "product 2",
    price: "100",
    isFavorite: false,
  },
  {
    title: "product 3",
    price: "900",
    isFavorite: true,
  },
  {
    title: "product 4",
    price: "50",
    isFavorite: true,
  },
  {
    title: "product 5",
    price: "1900",
    isFavorite: false,
  },
];

export default function HomeProducts() {
  return (
    <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
      <div className="mt-[40px] flex flex-col  w-full max-w-[1200px] p-[16px]">
        <h2 className="text-[36px] mb-[20px]">Our Products</h2>
        <div className="flex items-center">
          <div className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)]">
            New Product
          </div>
          <div className="mr-[10px]">|</div>
          <div className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)]">
            Best Seller
          </div>
          <div className="mr-[10px]">|</div>
          <div className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)]">
            Sale
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 mt-[20px]">
          {products.map((prod, index) => (
            <ProductCard
              key={index}
              title={prod.title}
              price={prod.price}
              isFavorite={prod.isFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
