import React from "react";
import ProductCard from "../ProductCard";
import Products from "../../app/dummy_products";

const newSeasonTrends = [...Products.slice(10, 16)];

export default function NewTrending() {
  return (
    <div className="flex w-full justify-center items-center my-8 md:my-12 lg:my-20">
      <div className="max-w-[1200px] w-full px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-16 lg:gap-20">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 lg:mb-4 ">
              New Trending
            </p>
            <p className="text-base md:text-lg lg:text-xl ">
              An Exclusive Selection <br className="hidden md:block" />
              Of This Season&apos;s Trends
            </p>
          </div>
          <div className="flex gap-4 justify-start mt-4 md:mt-6 lg:mt-8 mb-6 md:mb-8 lg:mb-10 overflow-x-auto  p-1 pb-2">
            {newSeasonTrends.map((prod) => (
              <div className="min-w-[280px]" key={prod.id}>
                {/* <ProductCard
                  title={prod.name}
                  isFavorite={prod.isFavorite}
                  price={prod.price}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
