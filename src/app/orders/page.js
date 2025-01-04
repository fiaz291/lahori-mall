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
          <RecentOrders orders={ordersData?.orders} loading={ordersLoading} />
          {!ordersLoading && (
            <span className="pangination flex justify-center">
              <ReactPaginate
                initialPage={page ? Number(page - 1) : 0}
                breakLabel="..."
                onPageChange={(e) => {
                  router.push(`/orders?page=${e.selected + 1}`);
                }}
                pageRangeDisplayed={1}
                pageCount={ordersData?.totalPages}
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
