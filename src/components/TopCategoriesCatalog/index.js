"use client";
import React, { useState } from "react";

export default function CategoriesCatalog() {
  const topCategories = [
    {
      name: "Electronics",
      image: "https://picsum.photos/150?random=3",
    },
    {
      name: "Clothing",
      image: "https://picsum.photos/150?random=4",
    },
    {
      name: "Accessories",
      image: "https://picsum.photos/150?random=5",
    },
    {
      name: "Food",
      image: "https://picsum.photos/150?random=6",
    },
    {
      name: "Bakery",
      image: "https://picsum.photos/150?random=7",
    },
  ];

  const [visibleCategories, setVisibleCategories] = useState([0, 1]);

  const handleNext = () => {
    setVisibleCategories(([first, second]) => {
      if (second < topCategories.length - 1) {
        return [first + 2, second + 2];
      } else {
        return [first, second];
      }
    });
  };

  const handlePrevious = () => {
    setVisibleCategories(([first, second]) => {
      if (first > 0) {
        return [first - 2, second - 2];
      } else {
        return [first, second];
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center px-[12px]">
      <div className="flex w-full max-w-[1200px] p-[16px] justify-between gap-8">
        <div className="flex flex-col flex-[1] justify-between">
          <div className="">
            <h3 className="text-[30px]">Top Categories</h3>
            <h3 className="text-[25px]">This Week</h3>
          </div>
          <div className="flex gap-8 ml-2">
            <button
              className="rounded-full h-[50px] w-[50px]  bg-[#bcbcbc] text-[#3f3f3f] text-[30px]"
              onClick={handlePrevious}
              disabled={visibleCategories[0] === 0}
            >
              {"<"}
            </button>
            <button
              className="rounded-full h-[50px] w-[50px]  bg-[#bcbcbc] text-[#3f3f3f] text-[30px]"
              onClick={handleNext}
              disabled={visibleCategories[1] >= topCategories.length - 1}
            >
              {">"}
            </button>
          </div>
          <div>
            <button className="text-[22px] text-[#00803e]">FULL CATALOG</button>
          </div>
        </div>
        <div className="flex flex-row justify-start flex-[2.3] gap-6">
          {topCategories
            .slice(visibleCategories[0], visibleCategories[1] + 1)
            .map((categ) => (
              <div
                className="h-[420px] w-[380px] border rounded-md border-[#525252] overflow-hidden cursor-pointer hover:shadow-md hover:shadow-[#ffffffd0] flex flex-col justify-end items-center bg-cover bg-center"
                key={categ.name}
                style={{ backgroundImage: `url(${categ.image})` }}
              >
                <h4 className="relative text-[20px] text-[#fff] w-full text-center bg-[#0000005d] py-2 px-4">
                  {categ.name}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
