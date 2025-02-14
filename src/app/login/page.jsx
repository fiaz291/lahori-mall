"use client";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Form, Input, message, Row } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import "./styles.css";
import { API_URLS } from "../apiUrls";
import axios from "axios";
import config from "../config";
import { setCookie } from "cookies-next";
import { store } from "../store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import ScreenLoader from "@/components/ScreenLoader";

const SocialLogin = dynamic(() => import("@/components/SocialLogin"), {
  ssr: false,
});

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values) => {
    const data = { ...values };
    setLoading(true);
    try {
      const response = await axios.post(config.url + API_URLS.USER_LOGIN, data);
      // return;
      const user = response.data.data;
      setCookie("token", user.token);
      setCookie("user", user);
      store.setState(() => {
        return {
          user: user,
        };
      });
      message.success("Welcome");
      router.push("/");
    } catch (error) {
      console.log({ error });
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    console.log("Failed");
  };

  // if (loading) {
  //   return (
  //     <div className="w-[100vw] h-[100vh] flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }
  return (
    <div>
      {loading && <ScreenLoader />}
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
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              className="mb-0 w-full login-input"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is Required",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Email" className="h-[60px] w-full" />
            </Form.Item>
            <Form.Item
              className="mb-0 w-full login-input"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="h-[60px]"
                visibilityToggle
              />
            </Form.Item>

            <Flex align="flex-end" vertical className="">
              <button
                type="submit"
                className="w-[124px] mt-2 h-[42px] bg-[#0047A0] hover:border-none hover:opacity-60 text-white rounded-md"
              >
                Login
              </button>
              <Link href="/signup">
                <p className="mt-2">Don't have account? Register now!</p>
              </Link>
            </Flex>
          </Form>
        </Flex>
        <SocialLogin />
      </Flex>
    </div>
  );
}
