'use client'
import React from "react";
import OrdersToDispatch from "./components/OrdersToDispatch";
import MonthlyFinanceReport from "./components/MonthlyFinanceReport";

export default function Dashboard() {
  return (
    <div>
      <p className="text-[24px]">Orders To Deliver Today</p>
      <OrdersToDispatch />
      <MonthlyFinanceReport />
    </div>
  );
}
