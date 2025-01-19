import React from "react";
import { Card, Tag, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import TextComponent from "../TextComponent";
import "./styles.css";

const SmallProductCard = ({ title, product, tag, color, isRecent }) => {
  return (
    <Card
      hoverable
      className="small-product-card"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: "auto",
        marginTop: isRecent ? 10 : 30,
        marginBottom: isRecent ? 10 : 30,
      }}
    >
      {!isRecent &&
        <div
          style={{ minWidth: "100px", minHeight: "100px", maxWidth: "100px", maxHeight: "100px" }}
        >
          <img
            alt="Live from 8pm to 9pm"
            src="//image.gmarket.co.kr/hanbando/202411/144ec47d-f3fb-4543-9de3-a78313aa7e22.jpg"
            style={{ objectFit: "cover", height: '100px' }}
          />
        </div>
      }
      <div className="p-[8px]">
        <Link
          href={`product/${product?.slug}`}
          className="link__item"
          data-montelena-asn="1"
          data-montelena-acode="200009652"
          data-montelena-goodscode="3883121456"
        >
          <div className="box__information">
            <Tag style={{ fontSize: 10 }} color={color}>
              {tag}
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
              {product.discountPrice || product?.price || "N/A"
              } AED
            </TextComponent>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default SmallProductCard;
