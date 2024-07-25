import React from "react";
import Navbar from "@/components/Navbar";
import AccountManage from "./components/AccountManage";
import RecentOrders from "./components/recent-orders";
import WishList from "./components/wish_list";
import Dummy_Orders from "../dummy_orders";
import Dummy_products from "../dummy_products";
import Footer from "@/components/Footer";

export default function UserProfile() {
  const Orders = Dummy_Orders;
  const Products = Dummy_products;

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-14 gap-14 ">
          <AccountManage />
          <RecentOrders orders={Orders} />
          <WishList wishlist={Dummy_products} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
