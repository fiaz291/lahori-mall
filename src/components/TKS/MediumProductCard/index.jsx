import React from "react";
import { Card, Tag, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import TextComponent from "../TextComponent";


const MediumProductCard = ({ item }) => {
  function calculatePercentage(part, whole) {
    if (whole === 0) {
      return 0.00; // Avoid division by zero
    }
    const percentage = (part / whole) * 100;
    return percentage.toFixed(2); // Limit to 2 decimal places
  }

  return (
    <Card
      hoverable
      cover={
        <img
          alt="Live from 8pm to 9pm"
          src="//image.gmarket.co.kr/hanbando/202411/144ec47d-f3fb-4543-9de3-a78313aa7e22.jpg"
        />
      }
      style={{ width: 'auto' }}
    >
      <Link
        href={`/product/${item?.slug}`}
        className="link__item"
        data-montelena-asn="1"
        data-montelena-acode="200009652"
        data-montelena-goodscode="3883121456"
      >
        <div className="box__information">
          {/* Price and Discount */}
          <div className="box__price--coupon box__price">
            <span className="text__item--title">
              <Row gutter={8}>
                <Col>
                  <TextComponent type="danger">
                    Original price
                  </TextComponent>
                </Col>
                <Col>
                  <TextComponent strike={true}>
                    {item?.price} AED
                  </TextComponent>
                </Col>
              </Row>
            </span>
            <div className="box__price--sale">
              <Row gutter={8}>
                <Col>
                  <TextComponent type="danger" bold size={16}>
                    {(100 - calculatePercentage(item.discountPrice, item.price)).toFixed(2)}%
                  </TextComponent>
                </Col>
                <Col>
                  <TextComponent
                    weight={700}
                    size={16}
                  >
                    {item.discountPrice} AED
                  </TextComponent>
                </Col>
              </Row>
            </div>
          </div>
          {/* Product Title */}
          <p
            className="text__itemcard-title"
            style={{
              fontWeight: "bold",
              marginTop: 10,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2, // Limits to 2 lines
              textOverflow: "ellipsis",
              fontSize: "14px",
            }}
          >
            {item.name}
          </p>
          {/* Delivery Info */}
          <Row gutter={1} style={{ marginTop: 10 }}>
            <Col>
              {/* SHIPPING PRICE */}
              {item?.freeDelivery &&
                <Tag style={{ fontSize: 12 }} color="green">
                  Free Shipping
                </Tag>
              }
            </Col>
            <Col>
              {/* SOLD COUNT */}
              <Tag style={{ fontSize: 12 }} color="orange">
                Purchase {item.totalSold}
              </Tag>
            </Col>
          </Row>
          {/* Payment Discount */}
          <div
            className="box__itemcard-nudging-group"
            style={{ marginTop: 10 }}
          >
            <TextComponent type="success" bold size={16}>
              <CheckCircleOutlined style={{ marginRight: 4 }} />
              Limited Time Offer
            </TextComponent>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default MediumProductCard;
