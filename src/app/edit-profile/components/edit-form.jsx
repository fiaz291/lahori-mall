"use client";
import React, { useEffect } from "react";
import { Button, Flex, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import config from "@/app/config";
import useAuthUser from "@/app/hooks/authUser";

export default function Edit_Form({ user, setOpenModal }) {
  const [form] = Form.useForm();
  const { resetUser, user } = useAuthUser();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const onFinish = async (values) => {
    values.id = user.id;
    try {
      const res = await axios.patch(`${config.url}/api/user`, {
        ...values,
      });
      resetUser(res?.data?.user);
      message.success("User Updated Successfully");
      if (setOpenModal) {
        setOpenModal(false);
      }
    } catch (error) {
      if (error?.response?.data) {
        message.error(error?.response?.data?.error);
      } else {
        message.error("something went wrong!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
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
        {/* <Form.Item
          className="mb-0"
          name="username"
          label={<span className="">Username</span>}
          rules={[
            {
              required: true,
              message: "Username is Required",
            },
          ]}
        >
          <Input className="form-control bg-white" disabled />
        </Form.Item> */}
        {/* <Form.Item
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
          <Input className="form-control bg-white" disabled />
        </Form.Item> */}
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
          name="address"
          label={<span className="">Address</span>}
          rules={[
            {
              required: true,
              message: "Address is Required",
            },
          ]}
        >
          <TextArea
            rows={4}
            className="form-control bg-white"
            placeholder="Address"
          />
        </Form.Item>
        <Form.Item
          className="mb-0"
          name="city"
          label={<span className="">City</span>}
          rules={[
            {
              required: true,
              message: "City is Required",
            },
          ]}
        >
          <Input
            className="form-control bg-white"
            placeholder="Enter your City"
          />
        </Form.Item>
        <Form.Item
          className="mb-0"
          name="state"
          label={<span className="">State</span>}
          rules={[
            {
              required: true,
              message: "State is Required",
            },
          ]}
        >
          <Input
            className="form-control bg-white"
            placeholder="Enter your State"
          />
        </Form.Item>
        <Form.Item
          className="mb-0"
          name="zipCode"
          label={<span className="">Zipcode</span>}
          rules={[
            {
              required: true,
              message: "Zipcode is Required",
            },
          ]}
        >
          <Input
            className="form-control bg-white"
            placeholder="Enter your Zipcode"
          />
        </Form.Item>
        <Form.Item
          className="mb-0"
          name="country"
          label={<span className="">Country</span>}
          rules={[
            {
              required: true,
              message: "Country is Required",
            },
          ]}
        >
          <Input
            className="form-control bg-white"
            placeholder="Enter your Country"
          />
        </Form.Item>
        {/* <Form.Item
          className="mb-0"
          name="profilePicture"
          label={<span className="">Profile Picture</span>}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            name="profilePicture"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item> */}
        <Flex justify="flex-end" gap={10} className="mt-[10px]">
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
