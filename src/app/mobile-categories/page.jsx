"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import { API_URLS } from "../apiUrls";
import Loader from "@/components/Loader";
import { Card, Col, Row } from "antd";
import Link from "next/link";

export default function MobileCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCatgories] = useState(null);
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(config.url + API_URLS.GET_CATEGORIES, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await axios.get(config.url + API_URLS.GET_SUB_CATEGORIES, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let allCategories = [];
      if (response && response.data.data && response.data.data.length > 0) {
        const originalArray = response.data.data;
        const replicatedArray = Array(20).fill(originalArray).flat();
        allCategories = [...allCategories, ...replicatedArray];
      }

      if (res && res.data.data && res.data.data.length > 0) {
        const originalArray = res.data.data;
        const replicatedArray = Array(20).fill(originalArray).flat();
        allCategories = [...allCategories, ...replicatedArray];
      }
      setCatgories(allCategories);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar hideSlider />
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col items-center w-full max-w-[1200px] mt-10 p-10 gap-5 bg-[rgba(255,255,255,0.4)]">
            <Loader />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar hideSlider />
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col w-full max-w-[1200px] p-10 pt-4 pb-4 gap-5 bg-[rgba(255,255,255,0.4)]">
          <p className="font-bold text-xl">Explore Categories!</p>
          <Row gutter={[4, 4]} justify="flex-start">
            {categories?.map((category, index) => (
              <Col
                key={index}
                xs={24} // Full width on extra small screens
                sm={12} // Half width on small screens
                md={8} // One-third width on medium screens
                lg={6} // One-fourth width on large screens
                xl={4} // One-sixth width on extra-large screens
                style={{ display: "flex", width: "100%" }}
              >
                <Link
                  href={`/category/${category.value}`}
                  style={{ width: "100%" }}
                >
                  <Card
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                    }}
                  >
                    <div>
                      <h3>{category.label}</h3>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
}
