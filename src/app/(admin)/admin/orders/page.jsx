'use client'
import React from "react";
import OrdersToDispatch from "./components/OrdersToDispatch";

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between mb-[10px]">
        <p className="text-[18px]">Orders To Deliver Today</p>
        <p className="text-[18px] text-[#89CFF0]">View All</p>
      </div>
      <OrdersToDispatch />
    </div>
  );
}
