"use client";
import React, { useState } from "react";
import useAuthUser from "../hooks/authUser";
import { useQuery } from "@tanstack/react-query";
import config from "../config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Flex } from "antd";
import RecentOrders from "./components/recent-orders";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import { COLORS } from "@/constants";

const orders = [
  {
    "id": 1,
    "userId": 101,
    "createdAt": "2025-01-10T10:15:00.000Z",
    "updatedAt": "2025-01-10T10:15:00.000Z",
    "totalAmount": 150.75,
    "status": "Delivered",
    "orderItems": [
      {
        "id": 201,
        "productId": 301,
        "quantity": 2,
        "price": 50.0
      },
      {
        "id": 202,
        "productId": 302,
        "quantity": 1,
        "price": 50.75
      }
    ],
    "vouchers": [
      {
        "id": 301,
        "voucherCode": "NEWYEAR2025",
        "isUsed": true,
        "discountAmount": 10.0
      }
    ],
    "financialTransactions": [
      {
        "id": 401,
        "transactionDate": "2025-01-10T10:20:00.000Z",
        "amount": -150.75,
        "type": "Debit",
        "description": "Order Payment"
      }
    ],
    "storeId": 501,
    "store": {
      "id": 501,
      "name": "Downtown Electronics",
      "location": "123 Main St, Metropolis, USA"
    }
  },
  {
    "id": 2,
    "userId": 102,
    "createdAt": "2025-01-11T12:30:00.000Z",
    "updatedAt": "2025-01-11T13:00:00.000Z",
    "totalAmount": 75.50,
    "status": "Pending",
    "orderItems": [
      {
        "id": 203,
        "productId": 303,
        "quantity": 1,
        "price": 75.50
      }
    ],
    "vouchers": [],
    "financialTransactions": [],
    "storeId": null,
    "store": null
  },
  {
    "id": 3,
    "userId": 103,
    "createdAt": "2025-01-12T09:45:00.000Z",
    "updatedAt": "2025-01-12T10:15:00.000Z",
    "totalAmount": 200.0,
    "status": "Shipped",
    "orderItems": [
      {
        "id": 204,
        "productId": 304,
        "quantity": 4,
        "price": 50.0
      }
    ],
    "vouchers": [
      {
        "id": 302,
        "voucherCode": "FREESHIP",
        "isUsed": true,
        "discountAmount": 0.0
      }
    ],
    "financialTransactions": [
      {
        "id": 402,
        "transactionDate": "2025-01-12T10:00:00.000Z",
        "amount": -200.0,
        "type": "Debit",
        "description": "Order Payment"
      }
    ],
    "storeId": 502,
    "store": {
      "id": 502,
      "name": "City Mall",
      "location": "456 Central Ave, Metropolis, USA"
    }
  }
]

export default function Page() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const router = useRouter();
  const { user } = useAuthUser();
  const {
    isPending: ordersLoading,
    error,
    data: ordersData,
  } = useQuery({
    queryKey: ["orderDataAll" + page],
    queryFn: () =>
      fetch(`
       ${config.url}/api/order?userId=${user.id}&limit=20&page=${
        page ? page : 1
      }`).then((res) => res.json()),
    enabled: !!user,
  });

  return (
    <div>
      <Navbar hideSlider />
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-14 gap-14 ">
          <RecentOrders orders={orders} loading={ordersLoading} />
          {!ordersLoading && (
            <span className="pangination flex justify-center">
              <ReactPaginate
                initialPage={page ? Number(page - 1) : 0}
                breakLabel="..."
                onPageChange={(e) => {
                  router.push(`/orders?page=${e.selected + 1}`);
                }}
                pageRangeDisplayed={1}
                pageCount={ordersData?.data?.totalPages}
                // previousLabel="< previous"
                renderOnZeroPageCount={null}
                activeClassName="active-pagination"
                pageClassName="pagination-button"
                nextClassName="pagination-button"
                previousClassName="pagination-button"
              />
            </span>
          )}

          {/* <Flex align="center" gap={12}>
              <button className="p-2 md:p-3 px-4 md:px-7 rounded-md text-sm md:text-base bg-[#00803e]  text-white">Previous</button>
              <h3>Total Pages: {ordersData?.totalPages}</h3>
              <button className="p-2 md:p-3 px-4 md:px-7 rounded-md text-sm md:text-base bg-[#00803e]  text-white">Next</button>
            </Flex> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
