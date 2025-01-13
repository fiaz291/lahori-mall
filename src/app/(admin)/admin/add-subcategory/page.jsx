"use client";
import { Form, Input, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import slugify from "slugify";
import axios from "axios";
import config from "@/app/config";

const AddSubCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  // Handler for form submission
  const onFinish = async (values) => {
    try {
      // Call the provided onSubmit function with form values
      await setSubGategory(values);
      // form.resetFields();
      setError(null);
    } catch (err) {
      setError("Error adding subcategory. Please try again.");
    }
  };
  const setSubGategory = async (data) => {
    console.log("setSubGategory", data);
    try {
      const response = await axios.post(
        config.url + "/api/sub-categories",
        data
      );
      if (response) {
      } else {
      }
    } catch (err) {}
  };
  const getGategories = async () => {
    try {
      const response = await axios.get(config.url + "/api/category");
      if (response) {
        setCategories(response.data.data);
      } else {
      }
    } catch (err) {}
  };
  useEffect(() => {
    getGategories();
  }, []);

  return (
    <Form
      form={form}
      name="addSubCategory"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
       {/* Category Field */}
       <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true, message: "Category is required" }]}
      >
        <Select
          placeholder="Select Category"
          options={categories}
          style={{ width: "100%" }}
        />
      </Form.Item>
      {/* Name Field */}
      <Form.Item
        name="name"
        label="Subcategory Name"
        rules={[{ required: true, message: "Subcategory Name is required" }]}
      >
        <Input
          placeholder="Enter Subcategory Name"
          onBlur={() => {
            const name = form.getFieldValue("name");
            if (name) {
              const slug = slugify(name, {
                replacement: "-",
                lower: true,
                strict: true,
              });
              form.setFieldValue("slug", slug);
            }
          }}
        />
      </Form.Item>

      {/* Slug Field */}
      <Form.Item
        name="slug"
        label="Slug"
        rules={[{ required: true, message: "Slug is required" }]}
      >
        <Input placeholder="Enter Slug" />
      </Form.Item>

      {/* URL Field */}
      <Form.Item
        name="url"
        label="URL"
        // rules={[{ required: true, message: "URL is required" }]}
      >
        <Input placeholder="Enter URL" />
      </Form.Item>

     

      {/* Error Message Display */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Submit Button */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Subcategory
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSubCategoryForm;
