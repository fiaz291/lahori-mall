"use client";
import config from "@/app/config";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import slugify from "slugify";
import { API_URLS } from "@/app/apiUrls";
import useS3Upload from "@/app/hooks/uploadToS3";

export default function EditProduct({ params }) {
  const [err, seErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [categories, setCatgories] = useState([]);
  const [subCategories, setSubCatgories] = useState([]);
  const [catId, setCatId] = useState(null);
  const [file, setFile] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { uploadToS3, uploading, error } = useS3Upload();
  const [prodData, setProdData] = useState(null);
  console.log({prodData})
  useEffect(() => {
    async function fetchProduct(slug) {
      try {
        const res = await axios.get(`${config.url}${API_URLS.PRODUCT}/${slug}`);
        if (res) {
          setProdData(res?.data?.data)
          setCatId(res?.data?.data?.categoryId)
          setUploadedFiles(res?.data?.data?.images)
        }
      } catch (error) {
        console.log({ error })
      }
    }
    if (params?.slugProduct) {
      fetchProduct(params.slugProduct);
    }
  }, [params])

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(config.url + API_URLS.GET_CATEGORIES, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response && response.data.data && response.data.data.length > 0) {
        setCatgories(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log({ err })
    }
  };
  const getSubCategories = async (catId) => {
    const response = await axios.get(`${config.url + API_URLS.GET_SUB_CATEGORIES}/${catId}`);
    if (response && response.data.data && response.data.data.length > 0) {
      setSubCatgories(response.data.data);
    }
  };
  useEffect(() => {
    if (catId) {
      getSubCategories(catId);
    }
  }, [catId])
  useEffect(() => {
    if (prodData) {
      getAllCategories();
    }
  }, [prodData]);
  const checkAvailableSlug = async () => {
    seErr(null);
    setMsg(null);
    const val = form.getFieldValue("slug");
    if (val) {
      try {
        const response = await axios.post(
          config.url + PRODUCT_SLUG_CHECKER,
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
          message.error("Something went wroeeeeng!");
        }
      }
    }
  };
  const onFinish = async (values) => {
    // console.log({values});
    // return;
    const data = { ...values };
    data.id = prodData.id;
      // data.tags = selectedTags;
    data.price = parseFloat(data.price);
    data.discountPrice = parseFloat(data.discountPrice);
    data.inventory = parseInt(data.inventory, 10);
    data.images = uploadedFiles;
    seErr(null);
    setMsg(null);

    try {
      const response = await axios.patch(config.url + API_URLS.PRODUCT, data);
      if (response.status === 200 && response.data.error) {
        seErr(response.data.error);
        message.error(response.data.error);
      } else {
        message.success("Product created successfully!");
        form.resetFields();
        setSelectedTags([]);
        setFile([]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => { };

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };


  const handleUpload = async () => {
    if (!file || file.length === 0) {
      alert("Please select files to upload!");
      return;
    }
    setIsUploading(true);
    try {
      const uploadPromises = Array.from(file).map((item) => uploadToS3(item));
      const fileUrls = await Promise.all(uploadPromises);
      if (fileUrls.length > 0) {
        setUploadedFiles([...uploadedFiles, ...fileUrls]);
        setFile([]);
      }
    } catch (error) {
      console.error({ error });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (file) => {
    const tempUploaded = [...uploadedFiles];
    tempUploaded.splice(tempUploaded.indexOf(file), 1);
    setUploadedFiles(tempUploaded);
  }
  if (loading) {
    return null;
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ ...prodData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >

      {/* Product Name */}
      <Form.Item
        className="mb-0"
        name="name"
        label="Product Name"
        rules={[{ required: true, message: "Product Name is Required" }]}
      >
        <Input
          className="form-control bg-white"
          placeholder="Enter Product Name"
          // onBlur={() => {
          //   const name = form.getFieldValue("name");
          //   if (name) {
          //     const slug = slugify(name, {
          //       replacement: "-",
          //       lower: true,
          //       strict: true,
          //     });
          //     form.setFieldValue("slug", slug);
          //   }
          // }}
        />
      </Form.Item>

      {/* Category */}
      <Form.Item
        className="mb-0"
        name="categoryId"
        label="Category"
        rules={[{ required: true, message: "Category is Required" }]}
      >
        <Select
          className="form-select"
          placeholder="Add Category for the Product"
          style={{ width: "100%" }}
          options={categories}
          onChange={(e) => { setCatId(e) }}
        />
      </Form.Item>

      {/* Subcategories */}
      <Form.Item className="mb-0" name="subCategoryId" label="Subcategories">
        <Select
          className="form-select"
          placeholder="Select subcategories"
          style={{ width: "100%" }}
          options={subCategories}
        />
      </Form.Item>

      {/* Slug */}
      <Form.Item
        className="mb-0"
        name="slug"
        label="Slug"
        rules={[{ required: true, message: "Slug is Required" }]}
      >
        <Input className="form-control bg-white" placeholder="Enter Slug" disabled />
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

      {/* Image Upload */}
      <Form.Item className="mb-0" name="image" label="Image">
        <input multiple type="file" onChange={handleFileChange} title="Select Images" />
        <Button onClick={handleUpload} disabled={isUploading || file.length < 1} className="mt-2">
          {file.length < 1 ? "No Image Selected" : "Upload Images"}
        </Button>
        {isUploading && <Spin tip="Loading" size="large">
          <div style={{
            padding: 50,
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 4,
          }} />
        </Spin>}
        <div className="flex flex-wrap gap-2 mt-4">
          {uploadedFiles.map((file, index) => (
            <div key={file}>
              {file && (
                <div className="relative h-[170px] w-[170px] bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
                  <img
                    src={file}
                    className="h-[150px] w-[150px]"
                    alt="product"
                  />
                  <CloseCircleOutlined
                    className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"
                    onClick={() => handleRemoveImage(file)} // Define the removal logic
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Form.Item>

      {/* Price & Discount */}
      <Form.Item className="mb-0" name="price" label="Price">
        <Input
          className="form-control bg-white"
          placeholder="Price"
          type="number"
        />
      </Form.Item>
      <Form.Item className="mb-0" name="discountPrice" label="Discount Price">
        <Input
          className="form-control bg-white"
          placeholder="Discount Price"
          type="number"
        />
      </Form.Item>

      {/* SKU, Inventory, Currency */}
      <Form.Item className="mb-0" name="SKU" label="SKU Number">
        <Input
          className="form-control bg-white"
          placeholder="SKU Number"
          type="text"
        />
      </Form.Item>
      <Form.Item className="mb-0" name="inventory" label="Inventory">
        <Input
          className="form-control bg-white"
          placeholder="Inventory"
          type="number"
        />
      </Form.Item>
      <Form.Item className="mb-0" name="currency" label="Currency">
        <Input className="form-control bg-white" placeholder="Currency" />
      </Form.Item>

      <Form.Item className="mb-0" name="description" label="Description">
        <Input className="form-control bg-white" placeholder="Description" TextArea />
      </Form.Item>
      <Form.Item className="mb-0" name="rating" label="Rating">
        <Input
          className="form-control bg-white"
          placeholder="Rating"
          type="number"
          min="0"
          max="5"
        />
      </Form.Item>
      <Form.Item className="mb-0" name="weight" label="Weight">
        <Input
          className="form-control bg-white"
          placeholder="Weight"
          type="number"
        />
      </Form.Item>
      <Form.Item className="mb-0" name="dimensions" label="Dimensions">
        <Input className="form-control bg-white" placeholder="Dimensions" />
      </Form.Item>

      {/* Freebie Products */}
      <Form.Item
        className="mb-0"
        name="freebieProductIDs"
        label="Freebie Products"
      >
        <Select
          mode="multiple"
          placeholder="Select freebie products"
          style={{ width: "100%" }}
          options={[]}
        />
      </Form.Item>
      <Form.Item name="isFeatured" valuePropName="checked" label="Is Featured">
        <Checkbox checked={prodData?.isFeatured}>Featured Product</Checkbox>
      </Form.Item>
      <Form.Item name="isActive" valuePropName="checked" label="Is Active">
        <Checkbox checked={prodData?.isActive}>Active Product</Checkbox>
      </Form.Item>

      {/* Submit */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
}
