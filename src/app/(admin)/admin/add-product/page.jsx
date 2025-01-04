"use client";
import config from "@/app/config";
import {
  Button,
  Checkbox,
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
// import { storage } from "@/firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import {
  cookingMethodTags,
  generalKitchenTags,
  materialTags,
  occasionTags,
  priceQualityTags,
} from "@/app/utils";
import Loader from "@/components/Loader";
import slugify from "slugify";

export default function AddProduct() {
  const [err, seErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [categories, setCatgories] = useState([]);
  const [subCategories, setSubCatgories] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const { quill, quillRef } = useQuill();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    setLoading(true);
    const response = await axios.get(config.url + "/api/category");
    if (response && response.data.data && response.data.data.length > 0) {
      /* const cats = response.data.categories.map((cat) => {
          return { value: cat.id, label: cat.name };
        }); */
      setCatgories(response.data.data);
    }
    setLoading(false);
  };
  const getSubCategories = async () => {
    setLoading(true);
    const response = await axios.get(config.url + "/api/sub-categories");
    if (response && response.data.data && response.data.data.length > 0) {
      /* const cats = response.data.categories.map((cat) => {
          return { value: cat.id, label: cat.name };
        }); */
      setSubCatgories(response.data.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getSubCategories();
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
    const images = files.map((file) => {
      if (file.url) return file.url;
    });
    const description = quill.root.innerHTML; // Get innerHTML using quill
    data.description = description;
    data.tags = selectedTags;
    data.price = parseFloat(data.price);
    data.discountPrice = parseFloat(data.discountPrice);
    data.inventory = parseInt(data.inventory, 10);
    data.images = images;
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
        setSelectedTags([]);
        setFiles([]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {});
    }
  }, [quill]);

  const onFinishFailed = (errorInfo) => {};
  // const handleUpload = (file) => {
  //   const storageRef = ref(storage, `uploads/${file.name}`);
  //   const token = "admin";
  //   const uploadTask = uploadBytesResumable(storageRef, file, {
  //     customMetadata: {
  //       token,
  //     },
  //   });

  //   setIsUploading(true);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  //       setUploadProgress((prevProgress) => {
  //         const updatedProgress = [...prevProgress];
  //         const fileIndex = files.findIndex((f) => f.name === file.name);
  //         if (fileIndex > -1) {
  //           updatedProgress[fileIndex] = progress;
  //         } else {
  //           updatedProgress.push(progress);
  //         }
  //         return updatedProgress;
  //       });
  //     },
  //     (error) => {
  //       message.error(`${file.name} file upload failed.`);
  //       setIsUploading(false);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setFiles((prevFiles) => {
  //           const updatedFiles = [...prevFiles];
  //           const fileIndex = updatedFiles.findIndex(
  //             (f) => f.name === file.name
  //           );
  //           if (fileIndex > -1) {
  //             updatedFiles[fileIndex].url = downloadURL;
  //           } else {
  //             updatedFiles.push({ name: file.name, url: downloadURL });
  //           }
  //           return updatedFiles;
  //         });
  //         message.success(`${file.name} file uploaded successfully`);
  //       });
  //       setIsUploading(false);
  //     }
  //   );
  // };

  const customRequest = ({ file, onSuccess }) => {
    // handleUpload(file);
    onSuccess("ok");
  };

  const handleTags = (tag) => {
    const copiedTags = [...selectedTags];
    if (copiedTags.includes(tag)) {
      copiedTags.splice(copiedTags.indexOf(tag), 1);
      setSelectedTags(copiedTags);
      return;
    }
    copiedTags.push(tag);
    setSelectedTags(copiedTags);
  };
  // if (loading) {
  //   return <Loader width={200} height={200} />;
  // }
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

      {/* Image Upload */}
      <Form.Item className="mb-0" name="image" label="Image">
        <Upload customRequest={customRequest} showUploadList={false} multiple>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <div className="flex flex-wrap gap-2 mt-4">
          {files.map((file, index) => (
            <div key={file.name}>
              {file.url && (
                <div className="h-[170px] w-[170px] bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
                  <img
                    src={file.url}
                    className="h-[150px] w-[150px]"
                    alt="product"
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

      {/* Product Attributes */}
      <Form.Item className="mb-0" name="description" label="Description">
        <div ref={quillRef} />
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

      {/* Related Products */}
      {/* <Form.Item
        className="mb-0"
        name="relatedProductIDs"
        label="Related Products"
      >
        <Select
          mode="multiple"
          placeholder="Select related products"
          style={{ width: "100%" }}
          options={[]}
        />
      </Form.Item> */}

      {/* Tags */}
      {/* <Form.Item
        className="mb-0"
        name="tags"
        label={<span className="">Tags</span>}
      >
        <div className="mb-[10px]">
          <div className="font-bold">General Kitchen Tags</div>
          <div className="flex flex-wrap gap-2">
            {generalKitchenTags.map((tag, index) => (
              <div
                key={index}
                style={
                  selectedTags.includes(tag.value)
                    ? {
                        borderColor: "red",
                      }
                    : {}
                }
                onClick={() => {
                  handleTags(tag.value);
                }}
                className="p-[4px] w-fit border cursor-pointer hover:opacity-80 rounded"
              >
                {tag.value}
              </div>
            ))}
          </div>
          <div className="mt-[10px] font-bold">Material Kitchen Tags</div>
          <div className="flex flex-wrap gap-2">
            {materialTags.map((tag, index) => (
              <div
                key={index}
                style={
                  selectedTags.includes(tag.value)
                    ? {
                        borderColor: "red",
                      }
                    : {}
                }
                onClick={() => {
                  handleTags(tag.value);
                }}
                className="p-[4px] w-fit border cursor-pointer hover:opacity-80 rounded"
              >
                {tag.value}
              </div>
            ))}
          </div>
          <div className="mt-[10px] font-bold">Cooking Method Kitchen Tags</div>
          <div className="flex flex-wrap gap-2">
            {cookingMethodTags.map((tag, index) => (
              <div
                key={index}
                style={
                  selectedTags.includes(tag.value)
                    ? {
                        borderColor: "red",
                      }
                    : {}
                }
                onClick={() => {
                  handleTags(tag.value);
                }}
                className="p-[4px] w-fit border cursor-pointer hover:opacity-80 rounded"
              >
                {tag.value}
              </div>
            ))}
          </div>
          <div className="mt-[10px] font-bold">Occasion Kitchen Tags</div>
          <div className="flex flex-wrap gap-2">
            {occasionTags.map((tag, index) => (
              <div
                key={index}
                style={
                  selectedTags.includes(tag.value)
                    ? {
                        borderColor: "red",
                      }
                    : {}
                }
                onClick={() => {
                  handleTags(tag.value);
                }}
                className="p-[4px] w-fit border cursor-pointer hover:opacity-80 rounded"
              >
                {tag.value}
              </div>
            ))}
          </div>
          <div className="mt-[10px] font-bold">Price Tags</div>
          <div className="flex flex-wrap gap-2">
            {priceQualityTags.map((tag, index) => (
              <div
                key={index}
                style={
                  selectedTags.includes(tag.value)
                    ? {
                        borderColor: "red",
                      }
                    : {}
                }
                onClick={() => {
                  handleTags(tag.value);
                }}
                className="p-[4px] w-fit border cursor-pointer hover:opacity-80 rounded"
              >
                {tag.value}
              </div>
            ))}
          </div>
        </div>
      </Form.Item> */}

      {/* Total Sold, Score, isFeatured, isActive */}
      {/* <Form.Item className="mb-0" name="totalSold" label="Total Sold">
        <Input
          className="form-control bg-white"
          placeholder="Total Sold"
          type="number"
        />
      </Form.Item> */}
      {/* <Form.Item className="mb-0" name="score" label="Score">
        <Input
          className="form-control bg-white"
          placeholder="Score"
          type="number"
          min="0"
          max="5"
        />
      </Form.Item> */}
      <Form.Item name="isFeatured" valuePropName="checked" label="Is Featured">
        <Checkbox>Featured Product</Checkbox>
      </Form.Item>
      <Form.Item name="isActive" valuePropName="checked" label="Is Active">
        <Checkbox>Active Product</Checkbox>
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
