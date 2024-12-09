"use client";
import React, { useCallback, useState } from "react";
import { COLORS } from "@/constants";
import Modal from "antd/es/modal/Modal";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import UserProfileMenu from "../UserProfileMenu";
import useWindowSize from "@/app/hooks/windowSize";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import useAuthUser from "@/app/hooks/authUser";
import { Badge, Drawer, Flex } from "antd";
import Link from "next/link";
import useCartItems from "@/app/hooks/cartItems";
import { useRouter } from "next/navigation";

const navButtons = ["HOME", "CATEGORIES", "ABOUT US", "CONTACT"];

const linkMap = {
  HOME: "/",
  CATEGORIES: "/tags",
  "ABOUT US": "#",
  CONTACT: "#",
  PROFILE: "/user-profile",
  ORDERS: "/orders",
};
const loggedInButtons = ["PROFILE", "ORDERS"];

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { user, userLoading, logout } = useAuthUser();
  const { cartItems: ordersInCart, cartLoading } = useCartItems();

  const [isOpen, setIsOpen] = useState(false);

  const { width, height } = useWindowSize();
  const isCollapsed = width < 900;

  const getCartCount = useCallback(() => {
    let quantity = 0;
    if (ordersInCart && ordersInCart.length > 0) {
      ordersInCart.forEach((cartProd) => {
        quantity = cartProd.quantity + quantity;
      });
    }
    return quantity;
  }, [ordersInCart]);

  const router = useRouter();
  const handleRedirect = (redirectTo) => {
    router.push(redirectTo);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${isCollapsed ? "gap-1" : "gap-4"
        }`}
    >
      {/* {!isCollapsed && (
        <div
          className={`flex w-full p-1 bg-black pl-3 pr-3  ${
            isCollapsed
              ? "fixed justify-center top-[0px] z-10"
              : "justify-between"
          }`}
        >
          <p className="text-white">
            🌟 Discover unbeatable deals on your favorite products—shop now and
            save big at our store!
          </p>
        </div>
      )} */}
      <div
        className={`flex ${"justify-between"} pl-[30px] px-4 items-center w-full max-w-[1200px] ${!isCollapsed ? "pt-8" : "pt-2"
          }`}
      >
        <img
          src="/logo-dark.png"
          className="w-[200px] h-[80px] cursor-pointer hover:opacity-80"
          onClick={() => {
            handleRedirect("/");
          }}
        />
        {isCollapsed && (
          <div className="flex gap-[16px] items-center">
            {user && (
              <div className="flex items-center gap-[16px]">
                <Badge
                  count={cartLoading ? 0 : getCartCount()}
                  className="cursor-pointer"
                  onClick={() => {
                    handleRedirect("/cart");
                  }}
                >
                  <button style={{ color: COLORS.red }} className="text-[30px]">
                    <ShoppingCartOutlined />
                  </button>
                </Badge>
                <div
                  style={{ color: COLORS.gray }}
                  className={`pl-[6px] pr-[6px] pt-[2px] pb-[2px] w-full h-[40px] rounded flex justify-center items-center`}
                >
                  {user?.firstName}
                </div>
              </div>
            )}
            <div
              className="cursor:pointer text-[22px]"
              onClick={() => setIsOpen(true)}
            >
              <MenuOutlined />
            </div>
          </div>
        )}
        <Drawer
          width="90%"
          title=""
          onClose={() => {
            setIsOpen(false);
          }}
          open={isOpen}
          closable={false}
        >
          <div className="flex justify-center">
            <img
              src="/logo.png"
              className="w-[40px] h-[40px]"
              onClick={() => {
                handleRedirect("/");
              }}
            />
          </div>
          {/* <Flex> */}
          {navButtons.map((btn, index) => (
            <Link href={linkMap[btn]} key={index}>
              <p
                className="p-[10px] mt-[10px] text-white text-center"
                style={{ background: COLORS.green }}
              >
                {btn}
              </p>
            </Link>
          ))}
          {/* </Flex> */}
          {user &&
            loggedInButtons.map((btn, index) => (
              <Link href={linkMap[btn]} key={index}>
                <p
                  className="p-[10px] mt-[10px] text-white text-center"
                  style={{ background: COLORS.gray }}
                >
                  {btn}
                </p>
              </Link>
            ))}
          {user ? (
            <p
              onClick={() => {
                logout();
              }}
              className="p-[10px] mt-[10px] text-white text-center"
              style={{ background: COLORS.gray }}
            >
              LOGOUT
            </p>
          ) : (
            <p
              className="p-[10px] mt-[10px] text-white text-center"
              style={{ background: COLORS.gray }}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              LOGIN
            </p>
          )}
          <p
            className="p-[10px] mt-[10px] text-white text-center"
            style={{ background: COLORS.red }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            CLOSE
          </p>
        </Drawer>
        {!isCollapsed && (
          <>
            <Flex vertical>
              {/* <div className="flex gap-8">
                {navButtons.map((button) => (
                  <button
                    key={button}
                    className="font-[13px] text-[17px]"
                    onClick={() => router.push(linkMap[button])}
                  >
                    {button}
                  </button>
                ))}
              </div> */}
              {/* <Search
                className="text-[14px] mt-[10px]"
                placeholder="SEARCH PRODUCTS"
                allowClear
                enterButton="FIND"
                size="large"
                onSearch={() => {}}
              /> */}
              <div className="relative">
                <input
                  type="text"
                  className="min-w-[554px] outline-none h-[45px] pl-6 pr-6 rounded-3xl"
                  style={{ border: "2px solid #067DFD" }}
                />
                <div className="absolute right-4 top-2 text-[24px] cursor-pointer hover:opacity-60 text-[#067DFD]">
                  <SearchOutlined />
                </div>
              </div>
            </Flex>
            <Flex gap={30}>
              <div>
                <img src="/icons/userIcon.png" className="w-[40px] cursor-pointer hover:opacity-60" />
              </div>
              <div>
                <img src="/icons/recentProductsIcon.png" className="w-[40px] cursor-pointer hover:opacity-60" />
              </div>
              <div>
                <img src="/icons/cartIcon.png" className="w-[40px] cursor-pointer hover:opacity-60" />
              </div>
            </Flex>
            {/* <UserProfileMenu
              handleRedirect={handleRedirect}
              cartLoading={cartLoading}
              cartCount={getCartCount()}
              key={user}
              setOpenModal={setOpenModal}
              isLogedin={isLogin}
              user={user}
              userLoading={userLoading}
              logout={logout}
            /> */}
          </>
        )}
      </div>
      {/* <div className="flex justify-between gap-16 items-center w-full max-w-[1200px] pl-[0px] pr-[20px]">
        {!isCollapsed && (
          <button
            style={{ background: COLORS.green }}
            className={"px-8 py-[2px] text-white w-[208px] h-[40px] rounded"}
          >
            Categories
          </button>
        )}
        <Search
          className="text-[14px]"
          placeholder="sEARCH PRODUCTS"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
      </div> */}
      <Modal
        open={openModal}
        closable={false}
        centered={true}
        title={isLogin ? "Login" : "Signup"}
        okText={isLogin ? "Login" : "Signup"}
        footer={false}
      >
        {isLogin ? (
          <LoginForm setOpenModal={setOpenModal} setIsLogin={setIsLogin} />
        ) : (
          <SignupForm setOpenModal={setOpenModal} setIsLogin={setIsLogin} />
        )}
      </Modal>
    </div>
  );
}
