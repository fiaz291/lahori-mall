import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Input, Row } from "antd";
import React from "react";


export default function Login() {
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
        <Flex align="flex-end" vertical className="">
          <button className="w-[124px] h-[42px] bg-[#0047A0] hover:border-none hover:opacity-60 text-white rounded-md">
            Login
          </button>
          <p className="mt-2">Don't have account? Register now!</p>
        </Flex>
      </Flex>
      {/* <Flex className="w-[420px]">
        <Divider className="bg-[#a8a8a8]" />
      </Flex> */}
      <Flex className="mt-3" gap={24}>
        <div style={{ borderRadius: '50%' }} className="text-[32px] text-[#EA4335] clickable p-4 bg-[#eee] w-[70px] h-[70px] flex items-center justify-center">
          <GoogleOutlined />
        </div>
        <div style={{ borderRadius: '50%' }} className="text-[32px] text-[#1877F2] clickable p-4 bg-[#eee] w-[70px] h-[70px] flex items-center justify-center">
          <FacebookOutlined />
        </div>
      </Flex>
    </Flex>
  );
}
