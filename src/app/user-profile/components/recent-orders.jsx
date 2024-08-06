"use client";
import { orderStatuses } from "@/app/utils";
import { COLORS } from "@/constants";
import {
  DollarOutlined,
  FireFilled,
  InfoCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Col, Collapse, Row, Skeleton } from "antd";
import { isArray } from "lodash";
import Link from "next/link";
import React from "react";

function RecentOrders({ orders, loading }) {
  // const tableHeader = ["Order #", "Placed On", "Items", "Total", "Status"];
  // const orders = [...props.orders];
  console.log({ orders });

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[15px]">Recent Orders</h3>
      {loading && <Skeleton active />}
      {!loading && (
        <>
          {!orders || !isArray(orders) || orders.length < 1 ? (
            <div>asdasd</div>
          ) : (
            <Collapse>
              {orders.map((order) => (
                <Collapse.Panel
                  header={
                    <Row gutter={12}>
                      <Col md={6}>
                        <p className="font-semibold flex items-center gap-2">
                          <ShoppingOutlined /> Order # {order.id}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="font-semibold  flex items-center gap-2">
                          <DollarOutlined /> Amount : {order.totalAmount}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p
                          className="font-semibold  flex items-center gap-2"
                          style={{ color: orderStatuses[order.status].color }}
                        >
                          <InfoCircleOutlined /> Status :{" "}
                          {orderStatuses[order.status].name}
                        </p>
                      </Col>
                    </Row>
                  }
                  key={order.id}
                >
                  {order.orderItems.map((item, index) => (
                    <Row align="middle" gutter={12} justify="start" key={index}>
                      <Col span={4} md={4} sm={8} xs={8}>
                        <Link href={`/product/${item.slug}`}>
                          <img
                            src={
                              item?.product?.images?.[0] || "/placeholder.webp"
                            }
                            className="w-[100px] h-[100px] object-contain"
                          />
                        </Link>
                      </Col>
                      <Col
                        span={4}
                        md={4}
                        sm={8}
                        xs={8}
                        className="font-semibold"
                      >
                        Price: {item.price}
                      </Col>
                      {item.product.isDiscount && (
                        <Col span={4} md={4} sm={8} xs={8}>
                          <Link href={`/product/${item.slug}`}>
                            <p
                              style={{ color: COLORS.green }}
                              className="font-semibold"
                            >
                              This Product is on Discount Now{" "}
                              <span style={{ color: COLORS.red }}>
                                <FireFilled />
                              </span>
                              <br />
                              Visit Now
                            </p>
                          </Link>
                        </Col>
                      )}
                    </Row>
                  ))}
                </Collapse.Panel>
              ))}
            </Collapse>
          )}
        </>
      )}
      {/* <div className="grid items-center grid-cols-[1.7fr_1.2fr_3.5fr_1.5fr_1.5fr] gap-6 bg-[#007a3b] p-2 text-white">
        {tableHeader.map((heading) => (
          <div key={heading} className="font-bold text-left text-[12px]">
            {heading}
          </div>
        ))}
      </div>
      <div className="max-h-[220px] overflow-y-auto">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid items-center grid-cols-[1.7fr_1.2fr_3.5fr_1.5fr_1.5fr] text-left gap-6 border-b border-[#4a4a4a] p-2 pb-4 text-[12px]"
          >
            <div>{order.id}</div>
            <div>{order.date}</div>
            <div className="flex items-center gap-2 overflow-x-scroll hidden_scroll_bar">
              {order.items.map((item, index) => (
                <img
                  className="w-12 h-12 cursor-pointer"
                  key={index}
                  src={item.image}
                  alt={item.name}
                />
              ))}
            </div>
            <div>Rs. {order.total}</div>
            <div
              className={`${
                order.status === "Delivered"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {order.status}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default RecentOrders;
