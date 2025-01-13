"use client"
import { Button, Flex, Form, Input, message } from "antd";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { store } from "@/app/store";
import config from "../config";
import { setCookie } from "cookies-next";
import { API_URLS } from "../apiUrls";
import { useRouter } from "next/navigation";




export default function AdminLogin() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values) => {
    const data = { ...values };
    try {
      const response = await axios.post(config.url + API_URLS.ADMIN_LOGIN, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log({response})
      if(response?.data?.data){
        setCookie("user", response.data?.data);
        setCookie("token", response.data?.data?.token);
        store.setState(() => {
          return {
            user: response?.data?.data,
          };
        });
        message.success("Welcome");
        router.push('/admin/dashboard')
      }
        // form.resetFields();
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => { };
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
            className="mb-0"
            name="email"
            label={<span className="">Email</span>}
            rules={[
              {
                required: true,
                message: "Email is Required",
              },
            ]}
          >
            <Input
              className="form-control bg-white"
              placeholder="Enter your Email"
            />
          </Form.Item>
          <Form.Item
            className="mb-0"
            name="password"
            label={<div className="">Password</div>}
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input
              type="password"
              className="form-control bg-white"
              placeholder="Enter your Password"
            />
          </Form.Item>
          <Flex justify="flex-end" gap={10} className="mt-[10px]">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
}
