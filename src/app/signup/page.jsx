'use client'
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Form, Input, message, Row } from "antd";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import './styles.css'
import { API_URLS } from "../apiUrls";
import axios from "axios";
import config from "../config";
import { setCookie } from "cookies-next";
import { store } from "../store";
import SocialLogin from "@/components/SocialLogin";




export default function Signup() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const data = { ...values };
    try {
      const response = await axios.post(config.url + API_URLS.USER_LOGIN, data);
      console.log({ response });
      return;
      setCookie("user", response.data.user);
      setCookie("token", response.data.token);
      store.setState(() => {
        return {
          user: response.data.user,
        };
      });
      message.success("Welcome");
      // form.resetFields();
      // setOpenModal(false);
    } catch (error) {
      console.log({ error })
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const onFinishFailed = () => {
    console.log('Failed')
  }
  return (
    <Flex vertical align="center" className="p-16">
      <Link href="/">
        <img src="/logo-dark.png" className="w-[270px] h-[120px] mb-4" />
      </Link>
      <Flex
        vertical
        className="w-[450px] rounded-xl p-4"
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
            name="name"
            rules={[
              {
                required: true,
                message: "Name is Required",
              },
              {
                type: "name",
                message: "Please enter a valid name address",
              },
            ]}
          >
            <Input placeholder="Name" className="h-[60px] w-full" />
          </Form.Item>
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
          <Form.Item
            className="mb-0 w-full login-input"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: "Confirm Password is required",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Re-Type Password"
              className="h-[60px]"
              visibilityToggle
            />
          </Form.Item>

          <Flex align="flex-end" vertical className="mt-2">
            <button type="submit" className="w-[124px] h-[42px] bg-[#0047A0] hover:border-none hover:opacity-60 text-white rounded-md">
              Signup
            </button>
            <Link href="/login"><p className="mt-2">Already have an account? Login now!</p></Link>
          </Flex>
        </Form>
      </Flex>
      <SocialLogin />
    </Flex>
  );
}
