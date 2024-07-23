"use client";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import Products from "../../app/dummy_products";

const newProducts = [...Products.slice(0, 9)];
const bestSeller = [...Products.slice(9, 19)];
const saleProducts = Products.filter((product) => product.onSale);

export default function HomeProducts() {
  const btns = ["New Products", "|", "Best Seller", "|", "Sale"];
  const [products, setProducts] = useState(newProducts);
  const [activeBtn, setActiveBtn] = useState("New Products");

  function getProductsList(btn) {
    switch (btn) {
      case "New Products":
        setProducts(newProducts);
        setActiveBtn("New Products");
        break;
      case "Best Seller":
        setProducts(bestSeller);
        setActiveBtn("Best Seller");
        break;
      case "Sale":
        setProducts(saleProducts);
        setActiveBtn("Sale");
        break;
      default:
        setProducts([]);
        setActiveBtn("");
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center px-[12px]">
      <div className="mt-[10px] flex flex-col w-full max-w-[1200px] p-[16px]">
        <h2 className="text-[36px] mb-[20px]">Our Products</h2>
        <div className="flex gap-4 items-center">
          {btns.map((btn, index) => (
            <div
              key={index}
              onClick={() => btn !== "|" && getProductsList(btn)}
              className={`text-[20px] ${
                btn === "|" ? "cursor-default" : "cursor-pointer"
              } mr-[10px] ${
                btn !== "|"
                  ? activeBtn === btn
                    ? "text-[#00803e]"
                    : "hover:text-[#82f6ba] text-[#d6d6d6]"
                  : ""
              }`}
            >
              {btn}
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-start mt-[20px] mb-[30px] overflow-x-auto hidden_scroll_bar p-[2px] pb-2">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
