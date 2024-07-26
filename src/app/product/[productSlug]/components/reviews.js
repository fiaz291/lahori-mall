import React from "react";
import Review from "./review";

export default function Reviews(prop) {
  const reviews = [
    {
      username: "kalm",
      review:
        "Absolutely love my new dinnerware set. I have watched this set of dishes on a couple of different platforms Amazon and Walmart. I didnt want to pay $100 or close to it so I waited until I found it on Temu for less than $60. I was sold. I love my new dishes so much and am hosting a girls brunch with my friends to show off my new dinnerware. I love it and it was so much cheaper on Temu Thank you Temu!!",
      date: "03/12/2023",
    },
    {
      username: "kjsakn",
      review:
        "beautiful silverware, exactly as described, very satisfied, very satisfied.",
      date: "12/1/2024",
    },
  ];

  return (
    <div className="flex w-full">
      <div className="flex flex-col mt-8 gap-6 w-full max-w-[800px]">
        <p className="text-lg md:text-xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </p>
        {reviews.map((rev, i) => (
          <Review
            key={i}
            username={rev.username}
            review={rev.review}
            date={rev.date}
          />
        ))}
        <button className="px-8 py-2 text-sm md:text-lg  border border-[#007f3e] w-fit rounded-full text-[#007f3e] self-center my-4">
          See All Reviews
        </button>
      </div>
    </div>
  );
}
