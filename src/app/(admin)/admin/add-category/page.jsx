"use client";
import config from "@/app/config";
import { storage, auth } from "@/firebase";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Progress, Upload, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AddCategory() {
  const [err, seErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [form] = Form.useForm();

  const checkAvailableSlug = async () => {
    seErr(null);
    setMsg(null);
    const val = form.getFieldValue("slug");
    if (val) {
      try {
        const response = await axios.post(
          config.url + "/api/category/slug-checker",
          {
            slug: val,
          }
        );
        if (response && response.status === 200 && response.data.error) {
          seErr(response.data.error);
        } else if (
          response &&
          response.status === 200 &&
          response.data.message
        ) {
          setMsg(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          message.error(error.response.data.error);
        } else {
          message.error("Something went wrong!");
        }
      }
    }
  };
  const onFinish = async (values) => {
    console.log({ values, file });
    if (!file) {
      return;
    }
    const data = { ...values };
    data.url = file;
    seErr(null);
    setMsg(null);

    try {
      const response = await axios.post(config.url + "/api/category", data);
      if (response.status === 200 && response.data.error) {
        seErr(response.data.error);
        message.error(response.data.error);
      } else {
        message.success("Category created successfully!");
        form.resetFields();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const handleUpload = ({ file }) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const token = "admin";
    const uploadTask = uploadBytesResumable(storageRef, file, {
      customMetadata: {
        token,
      },
    });
    setIsUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        message.error(`${file.name} file upload failed.`);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
          message.success(`${file.name} file uploaded successfully`);
        });
        setIsUploading(false);
      }
    );
  };
  const customRequest = ({ file, onSuccess }) => {
    handleUpload({ file });
    onSuccess("ok");
  };

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
        name="name"
        label={<span className="">Category Name</span>}
        rules={[
          {
            required: true,
            message: "Category Name is Required",
          },
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Enter Category Name"
        />
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="slug"
        label={<span className="">Slug</span>}
        rules={[
          {
            required: true,
            message: "Slug is Required",
          },
        ]}
      >
        <Input className="form-control bg-white" placeholder="Enter Slug" />
      </Form.Item>
      {err && <p style={{ color: "red", textAlign: "center" }}>{err}</p>}
      {msg && <p style={{ color: "black", textAlign: "center" }}>{msg}</p>}

      <Form.Item
        className="mb-0"
        name="image"
        label={<span className="">Image</span>}
      >
        <div>
          <Upload customRequest={customRequest} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Progress
            percent={uploadProgress}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
          {file && (
            <img src={file} className="w-full max-h-[300px] mt-[10px]" />
          )}
        </div>
      </Form.Item>
      <Form.Item label="Check Slug" className="mb-0">
        <Button
          onClick={() => {
            checkAvailableSlug();
          }}
        >
          Check Availability
        </Button>
      </Form.Item>

      <Flex justify="flex-end" gap={10} className="mt-[10px]">
        <Button type="primary" htmlType="submit" disabled={isUploading}>
          Add Category
        </Button>
      </Flex>
    </Form>
  );
}
