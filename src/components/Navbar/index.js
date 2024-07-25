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
import useWindowSize from "@/app/hooks/windowSize";
import { MenuOutlined } from "@ant-design/icons";

const navButtons = ["HOME", "ABOUT US", "SHOP", "BLOG", "CONTACT"];
export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { user, userLoading, logout } = useAuthUser();

  const { width, height } = useWindowSize();
  const isCollapsed = width < 900;

  return (
    <div className="flex flex-col justify-center items-center px-4 gap-4 pt-8">
      <div className="flex justify-between pl-[30px]  items-center w-full max-w-[1200px]">
        <img src="/logo.png" className="w-[80px] h-[80px]" />
        <div className="flex gap-[8px] items-center">
          {user && (
            <div
              style={{ color: COLORS.gray }}
              className={`pl-[6px] pr-[6px] pt-[2px] pb-[2px] w-[124px] h-[40px] rounded flex justify-center items-center`}
            >
              {user?.firstName}
            </div>
          )}
          <div className="cursor:pointer text-[22px]">
            <MenuOutlined />
          </div>
        </div>
        {!isCollapsed && (
          <>
            <div className="flex gap-8">
              {navButtons.map((button) => (
                <button key={button} className="font-[13px] text-[17px]">
                  {button}
                </button>
              ))}
            </div>
            <UserProfileMenu
              setOpenModal={setOpenModal}
              isLogedin={isLogin}
              user={user}
              userLoading={userLoading}
              logout={logout}
            />
          </>
        )}
      </div>
      <div className="flex justify-between gap-16 items-center w-full max-w-[1200px]">
        {!isCollapsed && (
          <button
            style={{ background: COLORS.green }}
            className={"px-8 py-[2px] text-white w-[208px] h-[40px] rounded"}
          >
            Categories
          </button>
        )}
        <Search
          className=" "
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
        {!isCollapsed && (
          <div className="flex flex-row justify-between gap-6 items-center w-[450px]">
            {/* <div className="text-gray-500 text-[20px]">❤ 2</div> */}
            <div className="text-gray-500 text-[20px]">🛒 3</div>
            <div className="flex flex-col gap-[4px] items-center">
              <div style={{ color: COLORS.red }} className={"font-semibold"}>
                Your Cart
              </div>
              <div style={{ color: COLORS.gray }}>2000 RS</div>
            </div>
          </div>
        )}
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
