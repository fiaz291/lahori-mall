"use client";
import React from "react";
import './styles.css'
import { Col, Flex, Row } from "antd";
import MediumProductCard from "../TKS/MediumProductCard";

export default function TKSHomePageProducts({ title }) {
  const array = new Array(30).fill(0);

  return (
    <div className={`outer pt-[20px] pb-[20px] ${!title ? "outer-background" : ""}`}>
      <div className="inner">
        {!title &&
          <div
            className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
            style={{
              color: 'white',
              fontWeight: 400,
              fontSize: 30,
              // textDecoration: "underline",
              // textUnderlineOffset: "6px",
            }}
          >
            ⚡️SUPER DEALS!
          </div>
        }
        {/* <Flex gap={16} wrap>
          {array.map((i) => (
             <MediumProductCard />
          ))}
        </Flex> */}
        <Row gutter={[16, 16]}>
          {[...Array(12)].map((_, index) => (
            <Col
              key={index}
              xs={12}  // 1 box on extra small screens
              sm={12} // 2 boxes on small screens
              md={8}  // 3 boxes on medium screens
              lg={6}  // 4 boxes on large screens and above
            >
              <MediumProductCard />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
