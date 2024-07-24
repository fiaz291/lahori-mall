import React from "react";
import ProductCard from "../ProductCard";
import Products from "../../app/dummy_products";

const newSeasonTrends = [...Products.slice(10, 16)];
export default function NewTrending() {
  return (
    <div className="flex w-full justify-center items-center my-[40px] ">
      <div className="max-w-[1200px] w-full px-[16px]">
        <div className="flex flex-col gap-24">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-[45px] mb-[5px] text-[#d9d9d9]">New Trending</p>
            <p className="text-[20px]  text-[#c9c9c9]">
              An Exclusive Selection <br />
              Of This Season&apos;s Trends
            </p>
          </div>
          <div className="flex gap-4 justify-start mt-[20px] mb-[30px] overflow-x-auto hidden_scroll_bar p-[2px] pb-2">
            {newSeasonTrends.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}