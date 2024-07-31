import config from "@/app/config";
import { Button, Flex, Form, Input, message } from "antd";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignupForm({ setOpenModal, setIsLogin }) {
  const [userNameSuggestions, setUserNameSuggestion] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [form] = Form.useForm();
  const router = useRouter();

  const checkValidUserName = async (e) => {
    try {
      const response = await axios.post(
        config.url + "/api/user/username-checker",
        {
          username: e.target.value,
        }
      );
      if (
        response.status === 200 &&
        response.data.error &&
        response.data.suggestions
      ) {
        setErrorMessage(response.data.error);
        setUserNameSuggestion(response.data.suggestions);
      } else {
        setErrorMessage(null);
        setUserNameSuggestion([]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const onFinish = async (values) => {
    const data = { ...values };
    delete data.confirmPassword;

    try {
      await axios.post(config.url + "/api/user", data);
      message.success("User created successfully!");
      setOpenModal(false);
      router.refresh();
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
        name="firstName"
        label={<span className="">First Name</span>}
        rules={[
          {
            required: true,
            message: "First Name is Required",
          },
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Enter your First Name"
        />
      </Form.Item>
      <Form.Item
        className="mb-0"
        name="lastName"
        label={<span className="">Last Name</span>}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Enter your Last Name"
        />
      </Form.Item>
      <Form.Item
        className="mb-0"
        name="username"
        label={<span className="">Username</span>}
        onBlur={checkValidUserName}
        rules={[
          {
            required: true,
            message: "Username is Required",
          },
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Enter your Username"
        />
      </Form.Item>
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      )}
      {userNameSuggestions.length > 0 && (
        <div className="flex flex-col items-center">
          <p className="text-center">
            Here are some suggestions of available Usernames
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {userNameSuggestions.map((name, index) => (
              <div
                key={index}
                className="pl-[6px] pr-[6px] pt-[2px] pb-[2px] border"
                onClick={() => {
                  form.setFieldValue("username", name);
                  setErrorMessage(null);
                  setUserNameSuggestion([]);
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
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
        name="phoneNumber"
        label={<span className="">Phone Number</span>}
        rules={[
          {
            required: true,
            message: "Phone Number is Required",
          },
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Enter your Phone Number"
        />
      </Form.Item>
      <Form.Item
        className="mb-0"
        name="password"
        label={<span className="">Password</span>}
        rules={[
          {
            required: true,
            message: "Password is Required",
          },
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="enter your Password"
        />
      </Form.Item>
      <Form.Item
        className="mb-0"
        name="confirmPassword"
        label={<span className="">Re-enter Password</span>}
        rules={[
          {
            required: true,
            message: "Confirm Password is Required",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Re-enter Password"
        />
      </Form.Item>
      <div>
        Already have an account?{" "}
        <span
          style={{ borderBottom: "1px dotted black" }}
          className="curson-pointer"
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Login here
        </span>
      </div>
      <Flex justify="flex-end" gap={10} className="mt-[10px]">
        <Button
          type="dashed"
          htmlType="submit"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Flex>
    </Form>
  );
}
