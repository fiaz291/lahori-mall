"use client";
import React, { useEffect } from "react";
import "./styles.css";
import { Col, Row, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import MediumProductCard from "@/components/TKS/MediumProductCard";

export default function ProductsPage({ title, data, isPending, error }) {
  if (isPending) {
    return (
      <div className={`outer pt-[20px] pb-[20px]`}>
        <div className="inner">
          <div
            className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
            style={{
              color: "white",
              fontWeight: 400,
              fontSize: 30,
            }}
          >
            {title || " Some Title "}
          </div>

          <Row gutter={[16, 16]}>
            {[...Array(6)].map((_, index) => (
              <Col key={index} sm={12} md={8} lg={6}>
                <Skeleton active />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="outer pt-[20px] pb-[20px]">
      <div className="inner">
          <div
            className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
            style={{
              color: "black",
              fontWeight: 400,
              fontSize: 30,
            }}
          >
            {title || "Some Title"}
          </div>

        <Row gutter={[16, 16]}>
          {data?.map((item, index) => (
            <Col key={index} sm={12} md={8} lg={6}>
              <MediumProductCard item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
