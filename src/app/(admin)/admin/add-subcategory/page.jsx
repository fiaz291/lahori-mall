"use client";
import { Form, Input, Button, Select } from "antd";
import React, { useState } from "react";
import slugify from "slugify";

const AddSubCategoryForm = ({ categories, onSubmit }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  // Handler for form submission
  const onFinish = async (values) => {
    try {
      // Call the provided onSubmit function with form values
      await onSubmit(values);
      form.resetFields();
      setError(null);
    } catch (err) {
      setError("Error adding subcategory. Please try again.");
    }
  };

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
        rules={[{ required: true, message: "URL is required" }]}
      >
        <Input placeholder="Enter URL" />
      </Form.Item>

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
