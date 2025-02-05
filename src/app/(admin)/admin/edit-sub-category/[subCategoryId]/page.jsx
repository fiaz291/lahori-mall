"use client";
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import useS3Upload from "@/app/hooks/uploadToS3";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Progress,
  Spin,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditSubCategory({ params }) {
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { uploadToS3, uploading, error } = useS3Upload();
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { subCategoryId } = params;

  useEffect(() => {
    if (subCategoryId) {
      fetchCategoryData();
    }
  }, [subCategoryId]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.url}/api/sub-categories?subCatId=${subCategoryId}`
      );
      if (response.status === 200 && response.data.data) {
        const subCategory = response.data.data;
        form.setFieldsValue({
          name: subCategory.name,
          slug: subCategory.slug,
          categoryId: subCategory.categoryId,
        });
        setUploadedFiles([subCategory.url]);
      } else {
        message.error("Sub Category not found!");
      }
    } catch (error) {
      message.error("Failed to fetch sub category data.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const data = {
        ...values,
        url: uploadedFiles.length > 0 ? uploadedFiles[0] : null, 
      };

      const response = await axios.patch(
        `${config.url}/api/sub-categories?id=${subCategoryId}`,
        data
      );

      if (response.status === 201) {
        message.success("Category updated successfully!");
        router.push("/admin/sub-categories"); // Redirect to category list
      } else {
        message.error(response.data.error || "Failed to update category.");
      }
    } catch (error) {
      message.error(error.response?.data?.error || "Something went wrong!");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleUpload = async () => {
    if (!file || file.length === 0) {
      alert("Please select a file to upload!");
      return;
    }
    setIsUploading(true);
    try {
      const fileUrls = await Promise.all(
        Array.from(file).map((item) => uploadToS3(item))
      );
      if (fileUrls.length > 0) {
        setUploadedFiles([fileUrls[0]]); // Replace old image
        setFile([]);
      }
    } catch (error) {
      console.error({ error });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedFiles([]);
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <Form
      name="edit-category"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        className="mb-0"
        name="name"
        label="Category Name"
        rules={[{ required: true, message: "Category Name is Required" }]}
      >
        <Input placeholder="Enter Sub Category Name" />
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="slug"
        label="Slug"
        rules={[{ required: true, message: "Slug is Required" }]}
      >
        <Input placeholder="Enter Slug"  disabled />
      </Form.Item>

      <Form.Item
        className="mb-0"
        name="categoryId"
        label="Category Id"
        rules={[{ required: true, message: "categoryId is Required" }]}
      >
        <Input placeholder="Enter categoryId"  disabled />
      </Form.Item>
      {err && <p style={{ color: "red", textAlign: "center" }}>{err}</p>}
      {msg && <p style={{ color: "black", textAlign: "center" }}>{msg}</p>}

      <Form.Item className="mb-0" name="image" label="Image">
        <input type="file" onChange={handleFileChange} />
        <Button
          onClick={handleUpload}
          disabled={isUploading || file.length < 1}
          className="mt-2"
        >
          {file.length < 1 ? "No Image Selected" : "Upload Image"}
        </Button>
        {isUploading && (
          <Spin tip="Uploading..." size="large">
            <div
              style={{
                padding: 50,
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: 4,
              }}
            />
          </Spin>
        )}
        {uploadedFiles.length > 0 && (
          <div className="relative h-[170px] w-[170px] mt-4">
            <img
              src={uploadedFiles[0]}
              className="h-[150px] w-[150px]"
              alt="Uploaded"
            />
            <CloseCircleOutlined
              className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"
              onClick={handleRemoveImage}
            />
          </div>
        )}
      </Form.Item>

      {/* <Form.Item label="Check Slug" className="mb-0">
        <Button onClick={checkAvailableSlug}>Check Availability</Button>
      </Form.Item> */}

      <Flex justify="flex-end" gap={10} className="mt-[10px]">
        <Button type="primary" htmlType="submit" disabled={isUploading}>
          Update Sub Category
        </Button>
      </Flex>
    </Form>
  );
}
