"use client";
import { Flex } from "antd";
import React from "react";

export default function TKSServices() {
  const array = new Array(10).fill(0);
  return (
    <div className="outer mt-[20px] mb-[20px]">
      <div className="inner">
        <div
          className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
          style={{
            color: "black",
            fontWeight: 400,
            fontSize: 30,
            // textDecoration: "underline",
            // textUnderlineOffset: "6px",
          }}
        >
          The Korean Stop Services
        </div>
        <Flex gap={16} className="overflow-scroll scrollbar-none">
          {array.map((i) => (
            <Flex vertical align="center">
              <img
                src={
                  "/placeholder.webp"
                }
                className="min-w-[100px] h-[100px] object-contain bg-black"
                style={{borderRadius: "50%"}}
              />
              <div>asdas</div>
            </Flex>
          ))}
        </Flex>
      </div>
    </div>
  );
}
