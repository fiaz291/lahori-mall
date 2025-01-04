'use client'
import React from "react";
import DataTable from "react-data-table-component";

export default function MonthlyFinanceReport() {
  // Define columns for the monthly finance report
  const columns = [
    {
      name: "Month",
      selector: (row) => row.month,
    },
    {
      name: "Total Revenue",
      selector: (row) => `$${row.totalRevenue.toLocaleString()}`,
    },
    {
      name: "Total Expenses",
      selector: (row) => `$${row.totalExpenses.toLocaleString()}`,
    },
    {
      name: "Profit",
      selector: (row) => `$${row.profit.toLocaleString()}`,
    },
    {
      name: "Orders Processed",
      selector: (row) => row.ordersProcessed,
    },
  ];

  // Sample data for each month
  const data = [
    {
      id: 1,
      month: "January 2024",
      totalRevenue: 50000,
      totalExpenses: 35000,
      profit: 50000 - 35000, // Profit = Revenue - Expenses
      ordersProcessed: 120,
    },
    {
      id: 2,
      month: "February 2024",
      totalRevenue: 75000,
      totalExpenses: 48000,
      profit: 75000 - 48000,
      ordersProcessed: 150,
    },
    {
      id: 3,
      month: "March 2024",
      totalRevenue: 68000,
      totalExpenses: 52000,
      profit: 68000 - 52000,
      ordersProcessed: 130,
    },
    {
      id: 4,
      month: "April 2024",
      totalRevenue: 90000,
      totalExpenses: 60000,
      profit: 90000 - 60000,
      ordersProcessed: 200,
    },
    {
      id: 5,
      month: "May 2024",
      totalRevenue: 80000,
      totalExpenses: 65000,
      profit: 80000 - 65000,
      ordersProcessed: 170,
    },
    {
      id: 6,
      month: "June 2024",
      totalRevenue: 95000,
      totalExpenses: 70000,
      profit: 95000 - 70000,
      ordersProcessed: 190,
    },
    {
      id: 7,
      month: "July 2024",
      totalRevenue: 120000,
      totalExpenses: 90000,
      profit: 120000 - 90000,
      ordersProcessed: 250,
    },
    {
      id: 8,
      month: "August 2024",
      totalRevenue: 110000,
      totalExpenses: 88000,
      profit: 110000 - 88000,
      ordersProcessed: 240,
    },
    {
      id: 9,
      month: "September 2024",
      totalRevenue: 115000,
      totalExpenses: 92000,
      profit: 115000 - 92000,
      ordersProcessed: 260,
    },
    {
      id: 10,
      month: "October 2024",
      totalRevenue: 130000,
      totalExpenses: 100000,
      profit: 130000 - 100000,
      ordersProcessed: 280,
    },
    {
      id: 11,
      month: "November 2024",
      totalRevenue: 140000,
      totalExpenses: 110000,
      profit: 140000 - 110000,
      ordersProcessed: 300,
    },
    {
      id: 12,
      month: "December 2024",
      totalRevenue: 180000,
      totalExpenses: 120000,
      profit: 180000 - 120000,
      ordersProcessed: 350,
    },
  ];

  return (
    <div className="mt-[24px]">
      <p className="text-[24px]">Monthly Finance Report</p>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
