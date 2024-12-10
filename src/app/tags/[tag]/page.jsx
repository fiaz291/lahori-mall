"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  useRouter as useRouterNavigation,
  useSearchParams,
} from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Form, Input, Skeleton, Tooltip } from "antd";
import Link from "next/link";
import "./styles.css";
import { COLORS } from "@/constants";
import { allTags, buildUrl, sideBarCategories } from "@/app/utils";
import config from "@/app/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./styles.css";
import Product_Route from "./components";
import { useRouter } from "next/router";
import TKSHomePageProducts from "@/components/TKSHomePageProducts";

export default function Page({ params }) {
  const { tag } = params;
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const [tagLabel, setTagLabel] = useState(null);

  const router = useRouterNavigation();
  const page = searchParams.get("page");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  useEffect(() => {
    if (tag) {
      const tagObj = allTags.find((tagS) => tagS.key === tag);
      setTagLabel(tagObj);
    }
  }, [tag]);
  const {
    isPending,
    error,
    data: tagData,
  } = useQuery({
    queryKey: ["dataByTag" + page + tag + min + max],
    queryFn: () =>
      fetch(`
       ${config.url}/api/tag?tag=${tagLabel?.value}&limit=50&page=${
        page ? page : 1
      }&minPrice=${min}&maxPrice=${max}`).then((res) => res.json()),
    enabled: !!tagLabel,
    cacheTime: 0, // Disable caching
    staleTime: 0,
  });

  const onFinish = (values) => {
    const url = buildUrl(`${tag}`, values);
    router.push(url);
  };

  const handleNext = () => {
    const pageNumber = page ? Number(page) + 1 : 2;
    router.push(`${tag}?page=${pageNumber}&minPrice=${min}&maxPrice=${max}`);
  };
  const handleBack = () => {
    router.push(
      `${tag}?page=${Number(page) - 1}&minPrice=${min}&maxPrice=${max}`
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-14 gap-14 ">
          <Product_Route tag={tagLabel} />
          <Flex gap={20}>
            <div className="min-h-[100vh] min-w-[200px]">
              {sideBarCategories.map((cat) => (
                <div
                  key={cat.title}
                  className="flex flex-col gap-[6px] mb-[10px]"
                >
                  <h3 className="text-[18px] font-semibold">{cat.title}</h3>
                  {cat.data.map((catS, index) => (
                    <div key={index} className="bg-white p-[10px] rounded">
                      <Link
                        href={`/tags/${catS.key}`}
                        className="text-[#666666] hover:text-[#ec1c24]"
                      >
                        <div className="text-[14px]">{catS.value}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* {isPending && <Skeleton />} */}
            {!isPending && tagData.length === 0 && (
              <div className="flex justify-center w-full">
                <img src="/product-not-found.png" className="w-[50%] h-fit" />
              </div>
            )}
            {/* {!isPending && tagData.length > 0 && ( */}
              <Flex vertical className="w-full max-w-[100%]">
                <Flex className="mb-[20px] bg-white p-3 rounded">
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={() => {}}
                    autoComplete="off"
                    form={form}
                  >
                    <Flex align="center" gap={20}>
                      <h3 className="font-semibold">Filters:</h3>
                      <p>Min Price:</p>
                      <Form.Item
                        className=""
                        style={{ marginBottom: 0 }}
                        name="min"
                      >
                        <Input className="min-w-[150px]" type="number" />
                      </Form.Item>
                      <p>Max Price:</p>
                      <Form.Item
                        className=""
                        style={{ marginBottom: 0 }}
                        name="max"
                      >
                        <Input className="min-w-[150px]" type="number" />
                      </Form.Item>
                      <Button htmlType="submit" danger>
                        Filter
                      </Button>
                    </Flex>
                  </Form>
                </Flex>
                <TKSHomePageProducts title="All Products" />
                {/* <div className="container2">
                  {tagData?.map((product, index) => (
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
                </div> */}
                <Flex justify="center" gap={50} className="w-full mt-[20px]">
                  <button
                    disabled={!page || Number(page) < 2}
                    className={`p-2 md:p-3 px-4 md:px-7 rounded-md text-sm md:text-base bg-[#00803e]  text-white ${
                      (!page || Number(page) < 2) &&
                      "bg-[#58595b] cursor-not-allowed"
                    }`}
                    onClick={handleBack}
                  >
                    Previous
                  </button>
                  <button
                    disabled={tagData?.length < 50}
                    onClick={handleNext}
                    className={`p-2 md:p-3 px-4 md:px-7 rounded-md text-sm md:text-base bg-[#0047A0] text-white ${
                      tagData?.length < 50 && "bg-[#0047A0] cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </Flex>
              </Flex>
            {/* )} */}
          </Flex>
        </div>
      </div>
      <Footer />
    </div>
  );
}
