import React from "react";
import { FaStar } from "react-icons/fa";

export default function Review(prop) {
  const stars = 4;

  return (
    <div className="flex flex-col gap-2 px-4 border border-gray-200 rounded-lg">
      <div className="flex w-full justify-between gap-4 items-center">
        <div className="flex flex-row gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <p className="text-base md:text-lg font-semibold text-gray-800">
            {prop.username}
          </p>
        </div>
        <p className="text-sm md:text-base text-gray-500">{prop.date}</p>
      </div>
      <div className="flex gap-1 text-yellow-500 mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`h-3 w-3 md:h-5 md:w-5 ${
              index < stars ? "fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="text-sm md:text-base text-gray-900">{prop.review}</div>
    </div>
  );
}
