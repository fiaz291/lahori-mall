"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import useAuthUser from "../hooks/authUser";
import config from "../config";
import { debounce, isArray } from "lodash";
import useCartItems from "../hooks/cartItems";
import Loader from "@/components/Loader";
import { store } from "../store";
import axios from "axios";
import IncDecCounter from "@/components/IncrementDecrementCounter";
import { Button, Col, Divider, Flex, Row, Tooltip, message } from "antd";
import { COLORS } from "@/constants";
import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import EditProfileModal from "@/components/EditProdileModal";
import useWindowSize from "../hooks/windowSize";

export default function PlaceOrder() {
  const { user } = useAuthUser();
  const { cartItems, cartLoading, getCartPrice } = useCartItems();
  const [loading, setLoading] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(null);
  const [orderAddress, setOrderAddress] = useState(null);
  const [showOrderAddress, setShowOrderAddress] = useState(false);
  useEffect(() => {
    if (user?.address) {
      setOrderAddress(user.address);
    }
  }, [user]);
  const [openModal, setOpenModal] = useState(false);
  const { width } = useWindowSize();

  const handleDeleteFromCart = async (cartItem) => {
    const prod = cartItem.product;
    setDeleteLoader(cartItem.id);

    try {
      const data = {
        userId: user.id,
        productId: prod.id,
      };
      await axios.delete(config.url + "/api/cart", {
        data: data,
      });
      const cartData = [...cartItems];
      const ifAlreadyExist = cartData.find(
        (cartProd) => cartProd.productId === prod.id
      );
      cartData.splice(cartData.indexOf(ifAlreadyExist), 1);
      store.setState((state) => {
        return {
          ...state,
          cart: cartData,
        };
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setDeleteLoader(null);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderItems = cartItems.map((cartItem) => {
        const price = cartItem.product.isDiscount
          ? cartItem.product.discountPrice
          : cartItem.product.price;
        return {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: price,
          slug: cartItem.product.slug,
          cartId: cartItem.id,
        };
      });
      const data = {
        userId: user.id,
        orderItems: orderItems,
        orderAddress: orderAddress ? orderAddress : user.address,
        billingAddress: user.address,
      };

      const res = await axios.post(config.url + "/api/order", data);

      if (!res.error) {
        store.setState((state) => {
          return {
            ...state,
            cart: [],
          };
        });
        message.info("Order Placed Successfully");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const getCartCount = useCallback(() => {
    let quantity = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((cartProd) => {
        quantity = cartProd.quantity + quantity;
      });
    }
    return quantity;
  }, [cartItems]);

  const debouncedHandlePlaceOrder = debounce(handlePlaceOrder, 300);

  if (cartLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <Loader width={200} height={200} />
      </div>
    );
  }

  if (!cartItems || (isArray(cartItems) && cartItems.length < 1)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar hideSlider />
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col max-w-[1200px] mt-10 p-10">
            <p className="font-bold text-xl border border-black p-10 rounded">
              Your Cart is Empty
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar hideSlider />
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 p-10 gap-5 bg-[rgba(255,255,255,0.4)]">
          <p className="font-bold text-xl">
            Hi {user?.firstName}, here are your order details. Happy shopping!
          </p>
          <Row gutter={24}>
            <Col span={16} md={16} sm={24} xs={24}>
              <table>
                <thead>
                  <th>
                    <td></td>
                  </th>
                </thead>
                <tbody className="flex flex-col gap-4 w-full">
                  {cartItems?.map((item, index) => (
                    <>
                      {width < 700 ? (
                        <span
                          className="border border-[rgba(0,0,0,0.2)] rounded p-10"
                          key={index}
                        >
                          <tr className="gap-4 flex justify-between">
                            <td>
                              <img
                                src={item.product.images[0]}
                                className="w-[100px] h-[100px] object-cover min-w-[100px] max-w-[100px]"
                              />
                            </td>
                            <td
                              className=""
                              style={{
                                flex: 1,
                              }}
                            >
                              <Tooltip title={item?.product?.name}>
                                {item?.product?.name &&
                                item.product.name.split(" ").length > 10
                                  ? item.product.name
                                      .split(" ")
                                      .slice(0, 10)
                                      .join(" ") + "..."
                                  : item?.product?.name}
                              </Tooltip>
                            </td>
                          </tr>
                          <tr className="gap-4 flex justify-between">
                            <td className="">
                              <div>
                                {!item.product?.isDiscount && (
                                  <p
                                    className="text-[16px]  font-semibold"
                                    style={{ color: COLORS.red }}
                                  >
                                    {item.product?.price} AED
                                  </p>
                                )}
                                {item.product?.isDiscount && (
                                  <div>
                                    <p
                                      className="text-[16px]  font-semibold"
                                      style={{ color: COLORS.red }}
                                    >
                                      {item.product?.discountPrice} AED
                                    </p>
                                    <p
                                      className="text-[12px] font-semibold line-through"
                                      style={{ color: COLORS.gray }}
                                    >
                                      {item.product?.price} AED
                                    </p>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="font-semibold">
                              <p>Quanitity: {item?.quantity}</p>
                            </td>
                            <td className="">
                              {deleteLoader === item.id ? (
                                <Loader width={40} height={40} />
                              ) : (
                                <div
                                  className="text-[24px] cursor-pointer hover:opacity-50"
                                  style={{ color: COLORS.red }}
                                  onClick={() => {
                                    handleDeleteFromCart(item);
                                  }}
                                >
                                  <DeleteOutlined />
                                </div>
                              )}
                            </td>
                          </tr>
                        </span>
                      ) : (
                        <tr
                          key={index}
                          className="border border-[rgba(0,0,0,0.2)] rounded p-10 gap-10 flex justify-between"
                        >
                          <td>
                            <img
                              src={item.product.images[0]}
                              className="w-[100px] h-[100px] object-cover min-w-[100px] max-w-[100px]"
                            />
                          </td>
                          <td
                            className=""
                            style={{
                              flex: 1,
                            }}
                          >
                            <Tooltip title={item?.product?.name}>
                              {item?.product?.name &&
                              item.product.name.split(" ").length > 10
                                ? item.product.name
                                    .split(" ")
                                    .slice(0, 10)
                                    .join(" ") + "..."
                                : item?.product?.name}
                            </Tooltip>
                          </td>

                          <td className="" style={{ flex: 1 }}>
                            <div>
                              {!item.product?.isDiscount && (
                                <p
                                  className="text-[16px]  font-semibold"
                                  style={{ color: COLORS.red }}
                                >
                                  {item.product?.price} AED
                                </p>
                              )}
                              {item.product?.isDiscount && (
                                <div>
                                  <p
                                    className="text-[16px]  font-semibold"
                                    style={{ color: COLORS.red }}
                                  >
                                    {item.product?.discountPrice} AED
                                  </p>
                                  <p
                                    className="text-[12px] font-semibold line-through"
                                    style={{ color: COLORS.gray }}
                                  >
                                    {item.product?.price} AED
                                  </p>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="font-semibold">
                            <p>Quanitity: {item?.quantity}</p>
                          </td>
                          <td className="">
                            {deleteLoader === item.id ? (
                              <Loader width={40} height={40} />
                            ) : (
                              <div
                                className="text-[24px] cursor-pointer hover:opacity-50"
                                style={{ color: COLORS.red }}
                                onClick={() => {
                                  handleDeleteFromCart(item);
                                }}
                              >
                                <DeleteOutlined />
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </Col>
            <Col span={8} md={8} sm={24} xs={24}>
              <div className="border border-[rgba(0,0,0,0.2)] rounded p-3 flex flex-col mt-[4px]">
                <p className="font-bold text-xl">
                  Location <PushpinOutlined />
                </p>
                {user.address ? (
                  <p>
                    {user.address} {user.city && user.city}{" "}
                    {user.zipCode && user.zipCode}
                  </p>
                ) : (
                  <button
                    className="text-white"
                    style={{ background: COLORS.green }}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    Enter Your Address in Profile
                  </button>
                )}
                {showOrderAddress && (
                  <textarea
                    value={orderAddress}
                    rows={4}
                    className="border border-[rgba(0,0,0,0.2)]  mt-2 rounded  outline-none p-2"
                    onChange={(e) => {
                      setOrderAddress(e.target.value);
                    }}
                  ></textarea>
                )}
                <Button
                  onClick={() => {
                    if (!showOrderAddress) {
                      setShowOrderAddress(true);
                    } else {
                      setShowOrderAddress(false);
                      setOrderAddress(null);
                    }
                  }}
                  className="mt-2"
                >
                  {showOrderAddress
                    ? "Use Default Address"
                    : "User A different address"}
                </Button>
                <Divider style={{ background: "rgba(0,0,0,0.2)" }} />
                <p className="font-bold text-xl">Order Summary</p>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr className="mt-[10px]">
                      <td>Subtotal ({getCartCount()} items)</td>
                      <td>{getCartPrice()} AED</td>
                    </tr>
                    <tr className="mt-[10px]">
                      <td>Delivery Charges</td>
                      <td>{getCartPrice() > 4999 ? "Free" : "400PKR"}</td>
                    </tr>
                  </tbody>
                </table>
                <Divider style={{ background: "rgba(0,0,0,0.2)" }} />
                <table>
                  <thead></thead>
                  <tbody>
                    <tr className="mt-[10px]">
                      <td>Total Amount</td>
                      <td>
                        {getCartPrice() > 4999
                          ? getCartPrice()
                          : getCartPrice() + 400}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  disabled={!user?.address}
                  className="w-full mt-[40px] text-white h-[40px] font-semibold disabled:opacity-50"
                  style={{ background: "#0047A0" }}
                  onClick={() => debouncedHandlePlaceOrder()}
                >
                  Place Order
                </button>
                {!user.address && (
                  <p className="mt-2 text-center" style={{ color: COLORS.red }}>
                    Update your address in profile
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <EditProfileModal openModal={openModal} setOpenModal={setOpenModal} />
      <Footer />
    </div>
  );
}
