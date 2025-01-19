"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useCallback, useState } from "react";
import useAuthUser from "../hooks/authUser";
import config from "../config";
import { isArray } from "lodash";
import useCartItems from "../hooks/cartItems";
import Loader from "@/components/Loader";
import { store } from "../store";
import axios from "axios";
import IncDecCounter from "@/components/IncrementDecrementCounter";
import { Button, Col, Divider, Flex, Row, Tooltip } from "antd";
import { COLORS } from "@/constants";
import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import EditProfileModal from "@/components/EditProdileModal";
import useWindowSize from "../hooks/windowSize";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { user } = useAuthUser();
  const { cartItems, cartLoading, getCartPrice } = useCartItems();
  const [loading, setLoading] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();

  const handleAddToCart = async (cartItem, quantity) => {
    const prod = cartItem.product;
    setLoading(cartItem.id);

    try {
      const data = {
        userId: user.id,
        productId: prod.id,
        quantity: Number(quantity),
      };
      const res = await axios.post(config.url + "/api/cart", data);
      const cartData = [...cartItems];
      const ifAlreadyExist = cartData.find(
        (cartProd) => cartProd.productId === prod.id
      );
      cartData.splice(cartData.indexOf(ifAlreadyExist), 1, res.data);
      store.setState((state) => {
        return {
          ...state,
          cart: cartData,
        };
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(null);
    }
  };

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

  const getCartCount = useCallback(() => {
    let quantity = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((cartProd) => {
        quantity = cartProd.quantity + quantity;
      });
    }
    return quantity;
  }, [cartItems]);

  // if (cartLoading) {
  //   return (
  //     <div className="h-[100vh] w-[100vw] flex items-center justify-center">
  //       <Loader width={280} height={200} />
  //     </div>
  //   );
  // }
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
              <table style={{ width: '100%' }}>
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
                                src={item?.product?.images?.[0]}
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
                                    className="text-[14px]  font-semibold"
                                    style={{ color: COLORS.red }}
                                  >
                                    {item.product?.price} AED
                                  </p>
                                )}
                                {item.product?.isDiscount && (
                                  <div>
                                    <p
                                      className="text-[14px]  font-semibold"
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
                            <td className="">
                              {loading === item.id ? (
                                <Loader width={40} height={40} />
                              ) : (
                                <IncDecCounter
                                  value={item?.quantity}
                                  setValue={(e) => {
                                    handleAddToCart(item, e);
                                  }}
                                  max={item?.product?.inventory || 1}
                                />
                              )}
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
                              src={item?.product?.images?.[0]}
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
                                  className="text-[14px]  font-semibold"
                                  style={{ color: COLORS.red }}
                                >
                                  {item.product?.price} AED
                                </p>
                              )}
                              {item.product?.isDiscount && (
                                <div>
                                  <p
                                    className="text-[14px]  font-semibold"
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
                          <td className="">
                            {loading === item.id ? (
                              <Loader width={40} height={40} />
                            ) : (
                              <IncDecCounter
                                value={item?.quantity}
                                setValue={(e) => {
                                  handleAddToCart(item, e);
                                }}
                                max={item?.product?.inventory || 1}
                              />
                            )}
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
                      <td>{getCartPrice() > 4999 ? "Free" : "400AED"}</td>
                    </tr>
                  </tbody>
                </table>
                <Divider style={{ background: "rgba(0,0,0,0.2)" }} />
                <table>
                  <thead></thead>
                  <tbody>
                    <tr className="mt-[10px]">
                      <td>Add Coupon</td>
                    </tr>
                    <tr className="mt-[10px]">
                      <td><input className="w-full p-2" style={{ border: '1px solid rgba(0,0,0,0.8)', outline: 'none' }} /></td>
                      <td><button className="w-full text-white h-[40px] font-semibold disabled:opacity-50"
                        style={{ background: '#0047A0' }}>Apply</button></td>

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
                  disabled={!user?.address || !user.phoneNumber}
                  className="w-full mt-[40px] text-white h-[40px] font-semibold disabled:opacity-50"
                  style={{ background: '#0047A0' }}
                  onClick={() => {
                    router.push("/place-order");
                  }}
                >
                  Proceed to checkout ({getCartCount()})
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
