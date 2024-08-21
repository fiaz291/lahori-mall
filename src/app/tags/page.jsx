"use client";
import React from "react";
import { Flex } from "antd";
import Link from "next/link";
import "./styles.css";
import { sideBarCategories } from "@/app/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./styles.css";
import Product_Route from "./components";

export default function Page({ params }) {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-14 gap-14 ">
          <Product_Route />
          <Flex gap={20}>
            <div>
              {sideBarCategories.map((tag) => (
                <div
                  key={tag.title}
                  className="flex flex-col gap-[6px] mb-[10px]"
                >
                  <h3 className="text-[18px] font-semibold">{tag.title}</h3>
                  <div className="container">
                    {tag.data.map((catS, index) => (
                      <Link
                        href={`/tags/${catS.key}`}
                        key={index}
                        className="text-[#666666] hover:text-[#ec1c24]"
                      >
                        <div className="bg-white p-[10px] rounded h-[100px] flex justify-center items-center text-center">
                          <div className="text-[14px] font-semibold">
                            {catS.value}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Flex>
        </div>
      </div>
      <Footer />
    </div>
  );
}
