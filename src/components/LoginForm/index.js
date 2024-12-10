import config from "@/app/config";
import { store } from "@/app/store";
import { Button, Flex, Form, Input, message } from "antd";
import axios from "axios";
import { setCookie } from "cookies-next";
import React from "react";

export default function LoginForm({ setOpenModal, setIsLogin }) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const data = { ...values };
    try {
      const response = await axios.post(config.url + "/api/user/login", data);
      setCookie("user", response.data.user);
      setCookie("token", response.data.token);
      store.setState(() => {
        return {
          user: response.data.user,
        };
      });
      message.success("Welcome");
      form.resetFields();
      setOpenModal(false);
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {};
  return (
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
        label={<span className="">Password</span>}
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
      <div className="mt-4 font-semibold clickable">
        Don't have account?{" "}
        <span
          style={{ borderBottom: "1px dotted black" }}
          className="curson-pointer"
          onClick={() => {
            setIsLogin(false);
          }}
        >
          Signup here
        </span>
      </div>

      <Flex justify="flex-end" gap={10} className="mt-[10px]">
        <Button
          type="dashed"
          onClick={() => {
            setOpenModal(false);
            form.resetFields();
          }}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Flex>
    </Form>
  );
}
