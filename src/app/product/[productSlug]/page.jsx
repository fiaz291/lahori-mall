"use client"
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

export default function page({ params }) {
  const { productSlug } = params;
  const Products = Dummy_products;

  const { isPending, error, data } = useQuery({
    queryKey: ["productData"],
    queryFn: () =>
      fetch(config.url + `/api/product/${productSlug}`).then((res) =>
        res.json()
      ),
  });
  if (isPending) {
    return <Loader width={40} height={40} />;
  }
  if (error) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-4 px-4 gap-8">
          <Product_Route prod={Products[0]} />
          <Product_details prod={data} />
          {/* <Reviews /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
