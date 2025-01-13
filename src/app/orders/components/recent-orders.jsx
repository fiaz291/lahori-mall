"use client";
import { orderStatuses } from "@/app/utils";
import { COLORS } from "@/constants";
import {
  DollarOutlined,
  FireFilled,
  InfoCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Col, Row, Skeleton } from "antd";
import { isArray } from "lodash";
import Link from "next/link";
import React, { useEffect } from "react";

function RecentOrders({ orders, loading }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[15px]">Recent Orders</h3>

      {loading && <Skeleton active />}
      {!loading && (
        <>
          {!orders || !isArray(orders) || orders.length < 1 ? (
            <div>You Have No Orders</div>
          ) : (
            <>
              {orders.map((order) => (
                <div key={order.id}>
                  <Row
                    gutter={12}
                    className="mb-[20px] bg-white p-[16px] rounded shadow-lg"
                  >
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
                        style={{ color: orderStatuses?.[order.status]?.color }}
                      >
                        <InfoCircleOutlined /> Status :{" "}
                        {orderStatuses?.[order.status]?.name}
                      </p>
                    </Col>
                  </Row>
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
                      {item?.product?.isDiscount && (
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
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RecentOrders;
