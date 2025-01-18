"use client";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthUser from "../hooks/authUser";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import Loader from "@/components/Loader";

const Routes = [
  {
    label: "Dashboard",
    //   icon: <Squares2X2Icon width="2" />,
    key: "/admin/dashboard",
    url: "/admin/dashboard",
    breadcrumb: "Overview",
  },
  {
    label: "Add Category",
    //   icon: <HomeIcon width="2" />,
    key: "/admin/add-category",
    url: "/admin/add-category",
    breadcrumb: "Add Category",
  },
  {
    label: "Add Sub Category",
    //   icon: <HomeIcon width="2" />,
    key: "/admin/add-subcategory",
    url: "/admin/add-subcategory",
    breadcrumb: "Add Category",
  },
  {
    label: "Add Product",
    //   icon: <HomeIcon width="2" />,
    key: "/admin/add-product",
    url: "/admin/add-product",
    breadcrumb: "Add Product",
  },
  {
    label: "Orders",
    //   icon: <HomeIcon width="2" />,
    key: "/admin/orders",
    url: "/admin/orders",
    breadcrumb: "Update Orders",
  },
  {
    label: "Property",
    //   icon: <BuildingOffice2Icon width={2} />,
    key: "/board",
    url: "/board",
    breadcrumb: "Board",
    children: [
      {
        label: "Add Property By MLS #",
        //   icon: <DownloadOutlined width={2} />,
        key: "/board/board-list/import",
        url: "/board/board-list/import",
        breadcrumb: "Add Property > Add Property By MLS #",
      },
    ],
  },
];
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();
  const [selectedKey, setSelectedKey] = useState(path);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setKeyClick = (key, pathCheck = true) => {
    setSelectedKey(key);
    router.push(key);
  };

  useEffect(() => {
    async function checkAdmin() {
      const token = getCookie("token");
      const user = getCookie("user");
      const parsedUser = JSON.parse(user);
      if (!token) {
        router.push("/login");
        return;
      }
      if (!parsedUser || parsedUser.data.role.toLowerCase() !== "admin") {
        router.push("/");
        return;
      }
      setLoading(false);
    }
    //checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] width-[100vw] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sidebar min-h-[100vh] bg-white"
        width="300px"
        collapsedWidth="100px"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          items={Routes}
          onClick={({ key }) => {
            setKeyClick(key);

            // setSelectedItem(Routes?.filter(route=>(route.key === key)[0]))
          }}
        />
      </Sider>
      <Layout className="min-h-[100vh] pl-[20px] pr-[20px] pb-[20px] pt-[10px]">
        <Header
          className="bg-white pb-[20px]"
          style={{ borderBottom: "1px solid black", marginBottom: 20 }}
        ></Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
