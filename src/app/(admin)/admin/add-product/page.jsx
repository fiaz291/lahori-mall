"use client";
import config from "@/app/config";
import {
  Button,
  Flex,
  Form,
  Input,
  Progress,
  Select,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";

export default function AddProduct() {
  const [err, seErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [categories, setCatgories] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllCategories = async () => {
      setLoading(true);
      const response = await axios.get(config.url + "/api/category");
      if (
        response &&
        response.data.categories &&
        response.data.categories.length > 0
      ) {
        const cats = response.data.categories.map((cat) => {
          return { value: cat.id, label: cat.name };
        });
        setCatgories(cats);
      }
      setLoading(false);
    };

    getAllCategories();
  }, []);
  const checkAvailableSlug = async () => {
    seErr(null);
    setMsg(null);
    const val = form.getFieldValue("slug");
    if (val) {
      try {
        const response = await axios.post(
          config.url + "/api/product/slug-checker",
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
    const data = { ...values };
    seErr(null);
    setMsg(null);

    try {
      const response = await axios.post(config.url + "/api/product", data);
      if (response.status === 200 && response.data.error) {
        seErr(response.data.error);
        message.error(response.data.error);
      } else {
        message.success("Product created successfully!");
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
  const abc = "";
  const handleUpload = (file) => {
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

        setUploadProgress((prevProgress) => {
          const updatedProgress = [...prevProgress];
          const fileIndex = files.findIndex((f) => f.name === file.name);
          if (fileIndex > -1) {
            updatedProgress[fileIndex] = progress;
          } else {
            updatedProgress.push(progress);
          }
          return updatedProgress;
        });
      },
      (error) => {
        message.error(`${file.name} file upload failed.`);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            const fileIndex = updatedFiles.findIndex(
              (f) => f.name === file.name
            );
            if (fileIndex > -1) {
              updatedFiles[fileIndex].url = downloadURL;
            } else {
              updatedFiles.push({ name: file.name, url: downloadURL });
            }
            return updatedFiles;
          });
          message.success(`${file.name} file uploaded successfully`);
        });
        setIsUploading(false);
      }
    );
  };

  const customRequest = ({ file, onSuccess }) => {
    handleUpload(file);
    onSuccess("ok");
  };

  if (loading) {
    return null;
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        className="mb-0"
        name="name"
        label={<span className="">Product Name</span>}
        rules={[
          {
            required: true,
            message: "Product Name is Required",
          },
        ]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Enter Product Name"
        />
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="categoryId"
        label={<span className="">Category</span>}
        rules={[
          {
            required: true,
            message: "Category is Required",
          },
        ]}
      >
        <Select
          className="form-select"
          // onChange={() => setPageUpdate(true)}
          placeholder="Add Category for the Product"
          rules={[
            {
              required: true,
              message: "Category is required",
            },
          ]}
          style={{
            width: "100%",
          }}
          options={categories}
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
      <Form.Item label="Check Slug" className="mb-0">
        <Button
          onClick={() => {
            checkAvailableSlug();
          }}
        >
          Check Availability
        </Button>
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="image"
        label={<span className="">Image</span>}
      >
        <div>
          <Upload customRequest={customRequest} showUploadList={false} multiple>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <div className="flex flex-wrap gap-2 mt-4">
            {files.map((file, index) => (
              <div key={file.name}>
                {file.url && (
                  <div className="h-[170px] w-[170px] bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
                    <img src={file.url} className="h-[150px] w-[150px]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="price"
        label={<span className="">Price</span>}
      >
        <Input
          className="form-control bg-white"
          placeholder="Price"
          type="number"
        />
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="discountPrice"
        label={<span className="">Discount Price</span>}
      >
        <Input
          type="number"
          className="form-control bg-white"
          placeholder="Discount Price"
        />
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="SKU"
        label={<span className="">SKU Number</span>}
      >
        <Input
          className="form-control bg-white"
          placeholder="SKU Number"
          type="number"
        />
      </Form.Item>
      <Form.Item
        className="mb-0"
        name="inventory"
        label={<span className="">Inventory</span>}
      >
        <Input
          type="number"
          className="form-control bg-white"
          placeholder="Inventory"
        />
      </Form.Item>

      <Flex justify="flex-end" gap={10} className="mt-[10px]">
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Flex>
    </Form>
  );
}
