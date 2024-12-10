import React from "react";
import { Card, Tag, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import TextComponent from "../TextComponent";
import "./styles.css";

const SmallProductCard = ({title}) => {
  return (
    <Card
      hoverable
      className="small-product-card"
      style={{
        width: 250,
        display: "flex",
        flexDirection: "row",
        height: "auto",
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      {/* Image on the left */}
      <div
        style={{ minWidth: "100px", minHeight: "100px", maxWidth: "100px", maxHeight: "100px" }}
      >
        <img
          alt="Live from 8pm to 9pm"
          src="//image.gmarket.co.kr/hanbando/202411/144ec47d-f3fb-4543-9de3-a78313aa7e22.jpg"
          style={{ objectFit: "cover", height: '100px' }}
        />
      </div>

      {/* Information block on the right */}
      <div className="p-[8px]">
        <Link
          href="/product/sample-product"
          className="link__item"
          data-montelena-asn="1"
          data-montelena-acode="200009652"
          data-montelena-goodscode="3883121456"
        >
          <div className="box__information">
            <Tag style={{ fontSize: 10 }} color="orange">
              Purchase 119
            </Tag>

            <p
              className="text__itemcard-title"
              style={{
                fontWeight: "bold",
                marginTop: 4,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2, // Limits to 2 lines
                textOverflow: "ellipsis",
                fontSize: "12px",
              }}
            >
             {title}
            </p>
            <TextComponent size={16} weight={700}>
              2,299,000 AED
            </TextComponent>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default SmallProductCard;
