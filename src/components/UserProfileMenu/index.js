import { COLORS } from "@/constants";
import { Badge, Button, Dropdown } from "antd";
import Link from "next/link";
import React from "react";
import Loader from "../Loader";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function UserProfileMenu({
  setOpenModal,
  isLogedin,
  user,
  userLoading,
  logout,
  cartCount,
  cartLoading,
  handleRedirect,
}) {
  const items = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
    },
    user &&
      user.role === "admin" && {
        key: "3",
        label: <Link href="/admin/dashboard">Dashborad</Link>,
      },
    {
      key: "2",
      label: <div onClick={logout}>Logout</div>,
    },
  ];
  if (userLoading) {
    return <Loader width="20px" height="20px" />;
  }
  if (user) {
    return (
      <div className="flex items-center gap-[26px]" key={user}>
        <Badge
          count={cartLoading ? 0 : cartCount}
          className="cursor-pointer"
          onClick={() => {
            handleRedirect("/cart");
          }}
        >
          <div className="text-[30px]" style={{ color: COLORS.red }}>
            <ShoppingCartOutlined />
          </div>
        </Badge>
        <Dropdown
          trigger="click"
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button>Menu</Button>
        </Dropdown>
      </div>
    );
  }
  return (
    <button
      key={user}
      style={{ background: COLORS.gray }}
      className={`pl-[6px] pr-[6px] pt-[2px] pb-[2px] text-white w-[124px] h-[40px] rounded`}
      onClick={() => {
        setOpenModal(true);
      }}
    >
      {isLogedin ? "Login" : "Signup"}
    </button>
  );
}
