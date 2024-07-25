"use client";
import React, { useState } from "react";
import Search from "antd/es/input/Search";
import { COLORS } from "@/constants";
import Modal from "antd/es/modal/Modal";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import UserProfileMenu from "../UserProfileMenu";

const navButtons = ["HOME", "ABOUT US", "SHOP", "BLOG", "CONTACT"];

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center px-4 gap-4 pt-12">
      <div className="flex justify-between pl-[20px] items-center w-full max-w-[1200px]">
        <img src="/logo.png" className="w-[100px] h-[100px]" />
        <div className="flex gap-8">
          {navButtons.map((button) => (
            <button key={button} className="font-[12px] text-[15px]">
              {button}
            </button>
          ))}
        </div>
        <UserProfileMenu setOpenModal={setOpenModal} isLogedin={isLogin} />
      </div>
      <div className="flex justify-between gap-16 items-center w-full max-w-[1200px]">
        <button
          style={{ background: COLORS.green }}
          className="px-8 py-[2px] text-white w-[208px] h-[40px] rounded text-[14px]"
        >
          Categories
        </button>
        <Search
          className="text-[14px]"
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
        <div className="flex flex-row justify-between gap-6 items-center w-[450px] text-[16px]">
          <div className="text-gray-500 cursor-pointer">❤ 2</div>
          <div className="text-gray-500 cursor-pointer">🛒 3</div>
          <div className="flex flex-col gap-[4px] items-center">
            <div
              style={{ color: COLORS.red }}
              className="font-semibold text-[16px]"
            >
              Your Cart
            </div>
            <div style={{ color: COLORS.gray }} className="text-[14px]">
              Rs. 2000
            </div>
          </div>
        </div>
      </div>
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
