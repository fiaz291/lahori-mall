"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    <div className="flex justify-center items-center px-3 my-6">
      <div className="flex w-full max-w-[1200px] p-3 justify-between gap-4 flex-wrap">
        <div className="flex flex-col justify-evenly items-center text-center md:text-left md:items-start pl-2 w-full md:w-auto gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl">Top Categories</h3>
            <h3 className="text-xl md:text-2xl">This Week</h3>
          </div>
          <div className="flex gap-3 md:gap-6 mt-2">
            <button
              className="rounded-full h-10 w-10 md:h-12 md:w-12 bg-gray-400 text-gray-800 text-xl md:text-2xl flex items-center justify-center"
              onClick={handlePrevious}
              disabled={visibleCategories[0] === 0}
            >
              <FaChevronLeft />
            </button>
            <button
              className="rounded-full h-10 w-10 md:h-12 md:w-12 bg-gray-400 text-gray-800 text-xl md:text-2xl flex items-center justify-center"
              onClick={handleNext}
              disabled={visibleCategories[1] >= topCategories.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="mt-2">
            <button className="text-lg md:text-xl text-green-700">
              FULL CATALOG
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:flex-nowrap gap-4 md:gap-6 w-full md:w-auto">
          {topCategories
            .slice(visibleCategories[0], visibleCategories[1] + 1)
            .map((categ) => (
              <div
                className="h-60 w-full md:h-96 md:w-80 border rounded-md border-gray-700 overflow-hidden cursor-pointer hover:shadow-md hover:shadow-gray-200 flex flex-col justify-end items-center bg-cover bg-center"
                key={categ.name}
                style={{ backgroundImage: `url(${categ.image})` }}
              >
                <h4 className="relative text-lg md:text-xl text-white w-full text-center bg-black bg-opacity-50 py-2 px-4">
                  {categ.name}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
