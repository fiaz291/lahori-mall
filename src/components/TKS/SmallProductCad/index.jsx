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
        width: 270,
        display: "flex",
        flexDirection: "row",
        height: "auto",
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 30,
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
          href="http://item.gmarket.co.kr/Item?goodsCode=3883121456"
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

            {/* Price and Discount */}
            {/* <div className="box__price--coupon box__price">
              <span className="text__item--title">
                <Row gutter={8}>
                  <Col>
                    <TextComponent type="danger">
                      Coupon applied price
                    </TextComponent>
                  </Col>
                  <Col>
                    <TextComponent strike={true}>2,570,330 AED</TextComponent>
                  </Col>
                </Row>
              </span>
              <div className="box__price--sale">
                <Row gutter={8}>
                  <Col>
                    <TextComponent type="danger" bold size={16}>
                      10%
                    </TextComponent>
                  </Col>
                  <Col>
                    <TextComponent bold={true} size={16}>
                      2,299,000 AED
                    </TextComponent>
                  </Col>
                </Row>
              </div>
            </div> */}
            {/* Product Title */}
            {/* <p
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
              Samsung Bespoke Grande AI One Body WF2520HCEED Detergent Automatic
              25KG+20KG Washer Dryer Gray
            </p> */}
            {/* Delivery Info */}
            {/* <Row gutter={1} style={{ marginTop: 10 }}>
              <Col> */}
            {/* SHIPPING PRICE */}
            {/* <Tag style={{ fontSize: 8 }} color="green">
                  Free Shipping
                </Tag>
              </Col>
              <Col> */}
            {/* SOLD COUNT */}
            {/* <Tag style={{ fontSize: 8 }} color="orange">
                  Purchase 119
                </Tag>
              </Col>
            </Row> */}
            {/* Payment Discount */}
            {/* <div
              className="box__itemcard-nudging-group"
              style={{ marginTop: 10 }}
            >
              <TextComponent type="success" bold>
                <CheckCircleOutlined style={{ marginRight: 4 }} />
                7% discount on payment
              </TextComponent>
            </div> */}
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default SmallProductCard;
