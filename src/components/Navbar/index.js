"use client";
import React, { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import { COLORS } from "@/constants";
import Modal from "antd/es/modal/Modal";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import { getJwtToken, getUser } from "@/app/utils";
import { getCookie } from "cookies-next";
import useAuthUser from "@/app/hooks/authUser";
import UserProfileMenu from "../UserProfileMenu";

const navButtons = ["Home", "About Use", "Shop", "Blog", "Contact Us"];
export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
      <div className="flex justify-between items-center w-full max-w-[1200px]">
        <img src="/logo.png" className="w-[80px] h-[80px]" />
        <div className="flex gap-8">
          {navButtons.map((button) => (
            <button key={button} className="font-[16px] font-semibold">
              {button}
            </button>
          ))}
        </div>
       <UserProfileMenu setOpenModal={setOpenModal} />
      </div>
      <div className="flex justify-between items-center w-full max-w-[1200px]">
        <button
          style={{ background: COLORS.green }}
          className={`pl-[6px] pr-[6px] pt-[2px] pb-[2px] text-white w-[124px] h-[40px] rounded`}
        >
          Categories
        </button>
        <Search
          className="max-w-[500px] search"
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
        <div className="flex flex-col gap-[4px] items-center">
          <div style={{ color: COLORS.red }} className={`font-semibold`}>
            Your Cart
          </div>
          <div style={{ color: COLORS.gray }}>2000 RS</div>
        </div>
        {/* <button className="pl-[6px] pr-[6px] pt-[2px] pb-[2px] text-white bg-[#00803e] w-[124px] h-[40px]">
          Categories
        </button> */}
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
