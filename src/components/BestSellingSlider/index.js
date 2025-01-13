
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import config from "@/app/config";
import { Divider, Skeleton, Tooltip } from "antd";
import "./styles.css";
import { generalKitchenTags } from "@/app/utils";
import Link from "next/link";
import { COLORS } from "@/constants";
import TopSellingProductCard from "../TopSellingProductCard";
import { API_URLS } from "@/app/apiUrls";

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

const products = [
  {
    "id": 1,
    "name": "Sample Product",
    "slug": "sample-product",
    "price": 5000,
    "isDiscount": true,
    "discountPrice": 4500,
  },
  {
    "id": 1,
    "name": "Sample Product",
    "slug": "sample-product",
    "price": 5000,
    "isDiscount": true,
    "discountPrice": 4500,
  },
  {
    "id": 1,
    "name": "Sample Product",
    "slug": "sample-product",
    "price": 5000,
    "isDiscount": true,
    "discountPrice": 4500,
  },
  {
    "id": 1,
    "name": "Sample Product",
    "slug": "sample-product",
    "price": 5000,
    "isDiscount": true,
    "discountPrice": 4500,
  },
  {
    "id": 1,
    "name": "Sample Product",
    "slug": "sample-product",
    "price": 5000,
    "isDiscount": true,
    "discountPrice": 4500,
  },
  {
    "id": 1,
    "name": "Sample Product",
    "slug": "sample-product",
    "price": 5000,
    "isDiscount": true,
    "discountPrice": 4500,
  },
];

export default function BestSellingSlider({ title }) {


  const { isPending, error, data } = useQuery({
    queryKey: ["products_best_selling"],
    queryFn: () => fetch(config.url + API_URLS.PRODUCT_BEST_SELLING).then((res) => res.json()),
    cacheTime: 0, // Disable caching
    staleTime: 0,
  });
  console.log({ data })
  if (isPending) {
    // return (
    //   <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
    //     <div className="mt-[40px] flex flex-col  w-full max-w-[1200px] p-[16px]">
    //       <>
    //         <div
    //           className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
    //           style={{ color: COLORS.red, fontWeight: 600 }}
    //         >
    //           On Sale
    //         </div>
    //         <Skeleton active />
    //         {/* </div> */}
    //       </>
    //       <>
    //         <div
    //           className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
    //           style={{ fontWeight: 600 }}
    //         >
    //           New Product
    //         </div>
    //         <Skeleton active />
    //       </>
    //       <>
    //         <div
    //           className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mt-[20px] mb-[20px]"
    //           style={{ fontWeight: 600 }}
    //         >
    //           Last Month Best Seller
    //         </div>
    //         <Skeleton active />
    //       </>
    //     </div>
    //   </div>
    // );
  }
  if (error) {
    return null;
  }

  return (
    <>
      <div className="outer mt-[20px] relative">
        <div className="inner">
          <>
            <div
              className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
              style={{
                color: "black",
                fontWeight: 400,
                fontSize: 30,
              }}
            >
              🔥The best-selling product right now
            </div>
            <Carousel responsive={responsive} infinite>
              {products.map((prod, index) => (
                <TopSellingProductCard
                  key={index}
                  image={prod.images?.[0] || null}
                  product={prod}
                />
              ))}
            </Carousel>
          </>
        </div>
        <div className="h-[2px] width-full bg-[#CD2E3A] mt-[20px]" />
      </div>
    </>
  );
}
