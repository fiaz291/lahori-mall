"use client";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dummy_products from "@/app/dummy_products";

const newProducts = dummy_products;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function HomeProducts() {
  const [products, setProducts] = useState(newProducts);

  return (
    <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
      <div className="mt-[40px] flex flex-col  w-full max-w-[1200px] p-[16px]">
        <h2 className="text-[36px] mb-[20px]">Our Products</h2>
        <div
          className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
          style={{ textDecoration: "underline", fontWeight: 600 }}
        >
          New Product
        </div>
        <Carousel responsive={responsive}>
          {/* <div className="grid gap-4 grid-cols-4 mt-[20px]"> */}
          {products.map((prod, index) => (
            <ProductCard
              key={index}
              title={prod.title}
              price={prod.price}
              isFavorite={prod.isFavorite}
            />
          ))}
        </Carousel>

        <div
          className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
          style={{ textDecoration: "underline", fontWeight: 600 }}
        >
          Last Month Best Seller
        </div>
        <Carousel responsive={responsive}>
          {/* <div className="grid gap-4 grid-cols-4 mt-[20px]"> */}
          {products.map((prod, index) => (
            <ProductCard
              key={index}
              title={prod.title}
              price={prod.price}
              isFavorite={prod.isFavorite}
            />
          ))}
        </Carousel>
        <div
          className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
          style={{ textDecoration: "underline", fontWeight: 600 }}
        >
          On Sale
        </div>
        <Carousel responsive={responsive}>
          {/* <div className="grid gap-4 grid-cols-4 mt-[20px]"> */}
          {products.map((prod, index) => (
            <ProductCard
              key={index}
              title={prod.title}
              price={prod.price}
              isFavorite={prod.isFavorite}
            />
          ))}
        </Carousel>
        {/* </div> */}
      </div>
    </div>
  );
}
