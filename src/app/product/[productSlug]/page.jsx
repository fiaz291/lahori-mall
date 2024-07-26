import React from "react";
import Navbar from "@/components/Navbar";
import Dummy_products from "../../dummy_products";
import Footer from "@/components/Footer";
import Product_Route from "./components/product-route";
import Product_details from "./components/product-details";
import Reviews from "./components/reviews";

export default function UserProfile() {
  const Products = Dummy_products;

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-full max-w-[1200px] mt-10 mx-4 px-4 gap-8">
          <Product_Route prod={Products[0]} />
          <Product_details prod={Products[0]} />
          <Reviews />
        </div>
      </div>
      <Footer />
    </div>
  );
}
