import useAuthUser from "@/app/hooks/authUser";
import { COLORS } from "@/constants";
import { Button, Dropdown } from "antd";
import Link from "next/link";
import React from "react";
import Loader from "../Loader";

export default function UserProfileMenu({ setOpenModal, isLogedin }) {
  const { user, userLoading, logout } = useAuthUser();

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
  return (
    <>
      {user ? (
        <div className="flex items-center">
          <div
            style={{ color: COLORS.gray }}
            className={`pl-[6px] pr-[6px] pt-[2px] pb-[2px] w-[124px] h-[40px] rounded flex justify-center items-center`}
          >
            {user.firstName}
          </div>
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
      ) : (
        <button
          style={{ background: COLORS.gray }}
          className={`pl-[6px] pr-[6px] pt-[2px] pb-[2px] text-white w-[124px] h-[40px] rounded`}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {isLogedin ? "Login" : "Signup"}
        </button>
      )}
    </>
  );
}
