"use client";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dummy_products from "@/app/dummy_products";
import { useQuery } from "@tanstack/react-query";
import config from "@/app/config";
import Loader from "../Loader";
import { Skeleton } from "antd";

const newProducts = dummy_products;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 20,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1070 },
    items: 4,
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: { max: 1070, min: 815 },
    items: 3,
    partialVisibilityGutter: 10,
  },
  tabletSmall: {
    breakpoint: { max: 815, min: 464 },
    items: 2,
    partialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: { max: 464, min: 405 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile1: {
    breakpoint: { max: 405, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

const array = [1, 2, 3, 4];

export default function HomeProducts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(config.url + "/api/product").then((res) => res.json()),
  });

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
        <div className="mt-[40px] flex flex-col  w-full max-w-[1200px] p-[16px]">
          <h2 className="text-[36px] mb-[20px]">Our Products</h2>
            <>
              <div
                className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
                style={{ textDecoration: "underline", fontWeight: 600 }}
              >
                New Product
              </div>
                  <Skeleton active />
            </>
            <>
              <div
                className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
                style={{ textDecoration: "underline", fontWeight: 600 }}
              >
                Last Month Best Seller
              </div>
               <Skeleton active />
            </>
            <>
              <div
                className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
                style={{ textDecoration: "underline", fontWeight: 600 }}
              >
                On Sale
              </div>
               <Skeleton active />
              {/* </div> */}
            </>
        </div>
      </div>
    );
  }
  console.log({ data });
  if (error) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
      <div className="mt-[40px] flex flex-col  w-full max-w-[1200px] p-[16px]">
        <h2 className="text-[36px] mb-[20px]">Our Products</h2>
        {data?.products && (
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
              style={{ textDecoration: "underline", fontWeight: 600 }}
            >
              New Product
            </div>
            <Carousel responsive={responsive} partialVisible={true}>
              {data?.products?.map((prod, index) => (
                <ProductCard
                  key={index}
                  image={prod.images[0] || null}
                  product={prod}
                />
              ))}
            </Carousel>
          </>
        )}
        {data?.products && (
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
              style={{ textDecoration: "underline", fontWeight: 600 }}
            >
              Last Month Best Seller
            </div>
            <Carousel responsive={responsive} partialVisible={true}>
              {data?.products?.map((prod, index) => (
                <ProductCard
                  key={index}
                  image={prod.images[0] || null}
                  product={prod}
                />
              ))}
            </Carousel>
          </>
        )}
        {data?.products && (
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
              style={{ textDecoration: "underline", fontWeight: 600 }}
            >
              On Sale
            </div>
            <Carousel responsive={responsive} partialVisible={true}>
              {data?.products?.map((prod, index) => (
                <ProductCard
                  key={index}
                  image={prod.images[0] || null}
                  product={prod}
                />
              ))}
            </Carousel>
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
}
