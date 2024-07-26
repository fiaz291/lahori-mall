"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CheckCircleFilled, StarFilled } from "@ant-design/icons";

export default function Product_Details({ prod }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="flex flex-col gap-2 md:gap-3 w-full md:w-2/3">
        <div className="border border-slate-400">
          <img
            src={prod.images[0]}
            className="w-full h-full object-cover"
            alt="product"
          />
        </div>
        <div>
          <Carousel responsive={responsive} showDots={true}>
            {prod.images.map((img, index) => (
              <div key={index} className="pb-8">
                <div className="border border-slate-400 mr-2 md:mr-3">
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt={`product-${index}`}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col h-auto w-full md:w-1/3 md:px-4 gap-2 ">
        <div className="bg-green-100 text-[#007f3e] p-[6px] px-3 text-sm md:text-base rounded-md font-semibold flex items-center gap-2">
          <CheckCircleFilled />
          Free shipping for this item
        </div>
        <p className="text-base md:text-lg font-semibold">
          20 Piece Dinner Set Porcelain Ivory White Dinnerware with Pink Flower
          Pattern Plates and Bowls Services for 4
        </p>
        <p className="text-base md:text-lg font  text-gray-700">
          Quantity: 20pcs
        </p>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-base md:text-lg text-gray-700">Qty</p>
          <input
            type="number"
            min="1"
            max="10"
            defaultValue="1"
            className="w-16 p-1 border border-gray-300 text-gray-700 text-center bg-gray-100"
          />
        </div>
        <button className="bg-[#007f3e] mb-[-4px] text-white py-2 px-4 rounded-full w-full text-base md:text-lg">
          Buy now
        </button>
        <button className="bg-gray-100 text-black py-2 px-4 rounded-full w-full mt-2 text-base md:text-lg">
          Add to cart
        </button>
        <p className="text-[#007f3e] text-sm md:text-base font-semibold mt-2">
          66% off discount
        </p>
        <p className="text-sm md:text-base text-[#007f3e] mt-2">
          Delivery Charges: <span className="text-gray-600">Rs. 200</span>
        </p>
        <p className="text-sm md:text-base text-[#007f3e]">
          Standard Delivery:{" "}
          <span className="text-gray-600">5-10 business days</span>
        </p>
        <p className="text-sm md:text-base text-[#007f3e]">
          Fast Delivery:{" "}
          <span className="text-gray-600">2-7 business days</span>
        </p>
        <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 mt-2">
          <span>10 reviews</span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <span className="text-black">4.9</span>
            <StarFilled className="text-yellow-500" />
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#007f3e] mt-4">
          <CheckCircleFilled />
          <p className="font-semibold">Lahori Mall Commitments</p>
        </div>
        <div className="text-sm md:text-base text-gray-600 mt-2">
          <div className="flex items-start gap-2">
            <div className="text-[#007f3e]">✔</div>
            <div>
              <p className="font-semibold">Security & Privacy</p>
              <ul className="list-disc list-inside">
                <li>Safe payments</li>
                <li>Secure privacy</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-2">
            <div className="text-[#007f3e]">✔</div>
            <div>
              <p className="font-semibold">Delivery guarantee</p>
              <ul className="list-disc list-inside">
                <li>15-day no update refund</li>
                <li>Return if item damaged</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
