"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import AccountManage from "./components/AccountManage";
import WishList from "./components/wish_list";
import Dummy_Orders from "../dummy_orders";
import Dummy_products from "../dummy_products";
import Footer from "@/components/Footer";
import useAuthUser from "../hooks/authUser";
import { useQuery } from "@tanstack/react-query";
import config from "../config";
import RecentOrders from "./components/recent-orders";

export default function UserProfile() {
  const { user } = useAuthUser();
  const Orders = Dummy_Orders;
  const { isPending: ordersLoading, error, data:ordersData } = useQuery({
    queryKey: ["orderData" + user?.id],
    queryFn: () =>
      fetch(config.url + "/api/order?userId=" + user.id).then((res) =>
        res.json()
      ),
    enabled: !!user,
  });

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-14 gap-14 ">
          <AccountManage user={user} />
          <RecentOrders orders={ordersData} loading={ordersLoading} />
          <WishList wishlist={Dummy_products} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
