"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Dummy_products from "../../dummy_products";
import Footer from "@/components/Footer";
import Product_Route from "./components/product-route";
import Product_details from "./components/product-details";
import Reviews from "./components/reviews";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import config from "@/app/config";

export default function Page({ params }) {
  const { productSlug } = params;
  const Products = Dummy_products;

  const { isPending, error, data } = useQuery({
    queryKey: ["productData"],
    queryFn: () =>
      fetch(config.url + `/api/product/${productSlug}`).then((res) =>
        res.json()
      ),
  });
  // if (isPending) {
  //   return (
  //     <div className="h-[100vh] w-[100vw] flex justify-center items-center">
  //       <Loader width={200} height={200} />
  //     </div>
  //   );
  // }
  // if (error) {
  //   return null;
  // }

  return (
    <div className="outer">
      <div className="inner">

        <Navbar />
        <div className="flex justify-center">
          <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-4 px-4 gap-8">
            {/* <Product_Route prod={data} /> */}
            <Product_details prod={Products} />
            {/* <Reviews /> */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
