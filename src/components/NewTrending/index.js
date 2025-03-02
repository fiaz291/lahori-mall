import React from "react";
import ProductCard from "../ProductCard";
import { useQuery } from "@tanstack/react-query";
import config from "@/app/config";
import Carousel from "react-multi-carousel";
import { Skeleton } from "antd";
import { materialTags } from "@/app/utils";
import Link from "next/link";

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
export default function NewTrending() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(config.url + "/api/product").then((res) => res.json()),
  });
  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
        <div className="mt-[40px] flex flex-col  w-full max-w-[1200px] p-[16px]">
          {data?.products && (
            <>
              <div
                className="text-[20px] cursor-pointer mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
                style={{ fontWeight: 600 }}
              >
                Flying High
              </div>
              <Skeleton active />
            </>
          )}
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
              style={{ fontWeight: 600 }}
            >
              Flying High
            </div>
            <Carousel responsive={responsive} partialVisible={true}>
              {data?.products?.onSale?.map((prod, index) => (
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
            Search By Material
          </div>
          <div className="container">
            {materialTags.map((tag) => (
              <Link key={tag.key} href="#">
                <div className="p-[10px] shadow-md bg-white rounded text-center">
                  {tag.value}
                </div>
              </Link>
            ))}
          </div>
        </>
      </div>
    </div>
  );
}
