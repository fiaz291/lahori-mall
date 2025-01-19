"use client";
import { COLORS } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
import './styles.css';
import { Button, Form, Input, message } from "antd";
import { API_URLS } from "@/app/apiUrls";
import axios from "axios";
import config from "@/app/config";
import { getCookie } from "cookies-next";

export default function ManageAccComponent({ user }) {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const data = { ...values };
    delete data.confirmPassword;
    data.userId = user.id;

    try {
     const res =  await axios.post(config.url + API_URLS.USER_UPDATE_PASSWORD, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
     });
      message.success("Password Updated Successfully");
    } catch (error) {
      if(error?.response?.data?.code === 200) {
        message.error('Old Password is not correct');
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-lg sm:text-xl md:text-2xl">Manage My Account</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col max-w-[100%] md:max-w-[30%] gap-4 p-4 border border-[#3a3a3a] flex-1">
          <h3 className="text-[20px] sm:text-[20px]">Personal Profile</h3>
          <div className="grid-container">
            <div class="flex flex-col mb-2">
              <p class="font-bold">First Name: </p>
              <p className="grid-item">{user?.firstName}</p>
            </div>
            <div class="flex flex-col mb-2">
              <p class="font-bold">Last Name: </p>
              <p className="grid-item">{user?.lastName}</p>
            </div>
            <div class="flex flex-col mb-2">
              <p class="font-bold">Email: </p>
              <p className="grid-item">{user?.email}</p>
            </div>
            <div class="flex flex-col mb-2">
              <p class="font-bold">Phone Number: </p>
              <p className="grid-item">{user?.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4  p-4 border border-[#3a3a3a] flex-1">
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base">Address Book</h3>
              <button
                className="border-0 text-xs sm:text-sm text-white pl-4 pr-4 pt-2 pb-2 rounded"
                style={{ background: COLORS.green }}
                onClick={() => {
                  router.push("/edit-profile");
                }}
              >
                Edit
              </button>
            </div>
            <p className="text-[#919191] text-xs font-semibold">
              DEFAULT SHIPPING ADDRESS
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-bold">{user?.name}</p>
              <p className="font-extralight">
                {user?.address} {user?.city} {user?.state} {user?.country}{" "}
                {user?.zipCode}
              </p>
            </div>
          </div>
          <div className="w-px bg-[#3a3a3a] hidden md:block"></div>
          <div className="flex flex-col gap-4 md:flex-1">
          <h3 className="text-[20px] sm:text-[20px]">Reset Password</h3>
          
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
                name="oldPassword"
                label={<span className="">Password</span>}
                rules={[
                  {
                    required: true,
                    message: "Old Password is Required",
                  },
                ]}
              >
                <Input
                  type="password"
                  className="form-control bg-white"
                  placeholder="enter your Old Password"
                />
              </Form.Item>
              <Form.Item
                className="mb-0"
                name="newPassword"
                label={<span className="">Password</span>}
                rules={[
                  {
                    required: true,
                    message: "New Password is Required",
                  },
                ]}
              >
                <Input
                  type="password"
                  className="form-control bg-white"
                  placeholder="enter your New Password"
                />
              </Form.Item>
              <Form.Item
                className="mb-0"
                name="confirmPassword"
                label={<span className="">Re-enter</span>}
                rules={[
                  {
                    required: true,
                    message: "Confirm Password is Required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
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
                  type="password"
                  className="form-control bg-white"
                  placeholder="Re-enter New Password"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
