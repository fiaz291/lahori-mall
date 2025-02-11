"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Product_details from "./components/product-details";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import config from "@/app/config";
import useAuthUser from "@/app/hooks/authUser";
import { API_URLS } from "@/app/apiUrls";
import axios from "axios";
import useRecentViewedItems from "@/app/hooks/recentViewedItems";
import Item from "antd/es/list/Item";

export default function Page({ params }) {
  const { productSlug } = params;
  const { user, userLoading } = useAuthUser();
  const { isPending, error, data } = useQuery({
    queryKey: [`productData ${productSlug}`],
    queryFn: () =>
      fetch(config.url + `/api/product/${productSlug}`).then((res) =>
        res.json()
      ),
  });
  const { recentViewedItems, recentItemsLoading } = useRecentViewedItems();

  useEffect(() => {
    async function productViewed() {
      try {
        axios.post(config.url + API_URLS.PRODUCT_VIEW, {
          userId: user.id,
          productId: data?.data?.id,
        });
      } catch (err) {
        console.log({ err });
      }
    }
    if (!recentItemsLoading && !userLoading && user && data?.data?.id) {
      const isAlreadyThere = recentViewedItems?.find(
        (Item) => Item.product.id === data?.data?.id
      );
      if (!isAlreadyThere) {
        productViewed();
      }
    }
  }, [userLoading, user, data, recentItemsLoading, recentViewedItems]);

  if (isPending) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        <Loader width={200} height={200} />
      </div>
    );
  }
  if (error) {
    return null;
  }

  return (
    <div className="outer">
      <div className="inner">
        <Navbar hideSlider />
        <div className="flex justify-center">
          <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-4 px-4 gap-8">
            {/* <Product_Route prod={data} /> */}
            <Product_details prod={data?.data} />
            {/* <Reviews /> */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
