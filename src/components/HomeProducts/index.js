"use client";
import React from "react";
import ProductCard from "../ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import config from "@/app/config";
import { Skeleton, Tooltip } from "antd";
import "./styles.css";
import { generalKitchenTags } from "@/app/utils";
import Link from "next/link";
import { COLORS } from "@/constants";

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

export default function HomeProducts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["newProducts"],
    queryFn: () => fetch(config.url + "/api/product").then((res) => res.json()),
    cacheTime: 0, // Disable caching
    staleTime: 0,
  });

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
        <div className="mt-[40px] flex flex-col  w-full max-w-[1200px] p-[16px]">
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
              style={{ color: COLORS.red, fontWeight: 600 }}
            >
              On Sale
            </div>
            <Skeleton active />
            {/* </div> */}
          </>
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
              style={{ fontWeight: 600 }}
            >
              New Product
            </div>
            <Skeleton active />
          </>
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
              style={{ fontWeight: 600 }}
            >
              Last Month Best Seller
            </div>
            <Skeleton active />
          </>
        </div>
      </div>
    );
  }
  if (error) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
      <div className="mt-[0px] flex flex-col  w-full max-w-[1200px] p-[16px]">
        {data?.products?.onSale && (
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
              style={{
                color: COLORS.red,
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "6px",
              }}
            >
              On Sale
            </div>
            <Carousel responsive={responsive} partialVisible={true}>
              {data?.products?.onSale.map((prod, index) => (
                <ProductCard
                  key={index}
                  image={prod.images[0] || null}
                  product={prod}
                />
              ))}
            </Carousel>
          </>
        )}

        <>
          <div
            className="text-[20px] mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px] mt-[20px]"
            style={{ fontWeight: 600 }}
          >
            General Kitchen Categories
          </div>
          <div className="container">
            {generalKitchenTags.map((tag) => (
              <Link key={tag.key} href={`tags/${tag.key}`}>
                <div className="p-[10px] shadow-md bg-white rounded text-center">
                  {tag.value}
                </div>
              </Link>
            ))}
          </div>
        </>

        {data?.products?.new && (
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px] mt-[20px]"
              style={{ fontWeight: 600 }}
            >
              New Product
            </div>
            <Carousel responsive={responsive} partialVisible={true}>
              {data?.products?.new.map((prod, index) => (
                <ProductCard
                  key={index}
                  image={prod.images[0] || null}
                  product={prod}
                />
              ))}
            </Carousel>
          </>
        )}
        {data?.products?.topWeek && (
          <>
            <div
              className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
              style={{ fontWeight: 600 }}
            >
              Last Month Best Seller
            </div>
            <div className="container2">
              {data?.products?.topWeek.map((product, index) => (
                <Tooltip title={product?.name} key={index}>
                  <Link
                    href={`product/${product?.slug}`}
                    className="product-card-width-fav"
                  >
                    <div className="product-card-width-fav flex flex-col overflow-hidden rounded bg-[rgba(0,0,0,0.1)] cursor-pointer hover:opacity-80 h-full">
                      <div className="w-full product-card-image-height-fav bg-[#fff000] mb-[10px]">
                        <img
                          src={product?.images?.[0] || "/placeholder.webp"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-between p-[6px] gap-[4px]">
                        <div className="truncate ... text-[12px]">
                          {product?.name}
                        </div>
                      </div>
                      {!product?.isDiscount && (
                        <p
                          className="text-[16px] md:text-[14px] font-semibold p-[6px]"
                          style={{ color: COLORS.red }}
                        >
                          {product?.price} PKR
                        </p>
                      )}
                      {product?.isDiscount && (
                        <div className="p-[6px]">
                          <p
                            className="text-[16px] md:text-[14px] font-semibold"
                            style={{ color: COLORS.red }}
                          >
                            {product?.discountPrice} PKR
                          </p>
                          <p
                            className="text-[12px] md:text-[12px] font-semibold line-through"
                            style={{ color: COLORS.gray }}
                          >
                            {product?.price} PKR
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </Tooltip>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
