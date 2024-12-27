import { Button, Col, Divider, Flex, Input, Row } from "antd";
import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <Flex vertical align="center" className="p-16">
      <Link href="/">
        <img src="/logo-dark.png" className="w-[270px] h-[120px] mb-4" />
      </Link>
      <Flex
        vertical
        className="w-[420px] rounded-xl p-4"
        style={{ border: "1px solid #a8a8a8" }}
        gap={12}
      >
        <Input placeholder="Email" className="h-[60px]" />
        <Input placeholder="Password" className="h-[60px]" />
        <Input placeholder="Retype Password" className="h-[60px]" />
        <Flex justify="flex-end" className="">
          <button className="w-[124px] h-[42px] bg-[#0047A0] hover:border-none hover:opacity-60 text-white rounded-md">
            Signup
          </button>
        </Flex>
      </Flex>
      {/* <Flex className="w-[420px]">
        <Divider className="bg-[#a8a8a8]" />
      </Flex> */}
      {/* <Flex className="mt-8">asdasd</Flex> */}
    </Flex>
  );
}
