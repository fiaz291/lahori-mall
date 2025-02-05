"use client";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
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
    label: "Orders",
    //   icon: <HomeIcon width="2" />,
    key: "/admin/orders",
    url: "/admin/orders",
    breadcrumb: "Update Orders",
  },
  {
    label: "Products",
    //   icon: <BuildingOffice2Icon width={2} />,
    key: "/products",
    url: "/products",
    breadcrumb: "products",
    children: [
      {
        label: "All Products",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/products",
        url: "/admin/products",
        breadcrumb: "",
      },
      {
        label: "Add New Product",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/add-product",
        url: "/admin/add-product",
        breadcrumb: "",
      },
    ],
  },
  {
    label: "Categories",
    //   icon: <BuildingOffice2Icon width={2} />,
    key: "/categories",
    url: "/categories",
    breadcrumb: "categories",
    children: [
      {
        label: "All Categories",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/categories",
        url: "/admin/categories",
        breadcrumb: "",
      },
      {
        label: "Add New Categories",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/add-category",
        url: "/admin/add-category",
        breadcrumb: "",
      },
    ],
  },
  {
    label: "Sub Categories",
    //   icon: <BuildingOffice2Icon width={2} />,
    key: "/sub-categories",
    url: "/sub-categories",
    breadcrumb: "sub-categories",
    children: [
      {
        label: "All Sub-Categories",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/sub-categories",
        url: "/admin/sub-categories",
        breadcrumb: "",
      },
      {
        label: "Add New Sub-Category",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/add-sub-category",
        url: "/admin/add-sub-category",
        breadcrumb: "",
      },
    ],
  },
  {
    label: "Vouchers",
    //   icon: <BuildingOffice2Icon width={2} />,
    key: "/vouchers",
    url: "/vouchers",
    breadcrumb: "vouchers",
    children: [
      {
        label: "All Sub-Categories",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/vouchers",
        url: "/admin/vouchers",
        breadcrumb: "",
      },
      {
        label: "Add New Voucher",
        //   icon: <DownloadOutlined width={2} />,
        key: "/admin/add-voucher",
        url: "/admin/add-voucher",
        breadcrumb: "",
      },
    ],
  },
];
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();
  const [selectedKey, setSelectedKey] = useState(path);
  const [selectedItem, setSelectedItem] = useState(Routes[0]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setKeyClick = (key, pathCheck = true) => {
    setSelectedKey(key);
    router.push(key);
  };
  useEffect(() => {
    if (path) {
      const result = findRouteByKey(Routes, path);
      if (result) {
        setSelectedItem(result);
      }
    }
  }, [path]);

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

  const findRouteByKey = (routes, targetKey) => {
    for (const route of routes) {
      if (route.key === targetKey) {
        return route;
      }
      if (route.children) {
        const found = findRouteByKey(route.children, targetKey);
        if (found) return found;
      }
    }
    return null;
  };

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
        <img src="/logo-dark.png" className="mb-4" />
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          items={Routes}
          onClick={({ key }) => {
            setKeyClick(key);
            const result = findRouteByKey(Routes, key);
            if (result) {
              setSelectedItem(result);
            }
            // setSelectedItem(Routes?.flatMap((route) => (route.key === key)));
          }}
        />
      </Sider>
      <Layout className="min-h-[100vh] pl-[20px] pr-[20px] pb-[20px] pt-[10px]">
        <Header
          className="bg-white pb-[20px]"
          style={{ borderBottom: "1px solid black", marginBottom: 20 }}
        >
          <div className="text-white font-[600] text-[32px]">{selectedItem?.label}</div>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
