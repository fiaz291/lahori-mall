import React from "react";
import Dummy_Products from "./dummy_products";

export default function Wish_List(props) {
  const tableHeader = ["Product", "Quantity", "Rate", "Total", "Availability"];
  const products = [...Dummy_Products, ...props.wishlist];

  const to_int = (value) => {
    return parseInt(value.replace(/[^\d]/g, ""), 10);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3>Wish List</h3>
      <div className="grid grid-cols-[4fr_1fr_1fr_2fr_1.5fr] gap-6 bg-[#007a3b] p-2">
        {tableHeader.map((heading) => (
          <div key={heading} className="font-bold text-left">
            {heading}
          </div>
        ))}
      </div>
      <div className="max-h-[220px] overflow-y-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[4fr_1fr_1fr_2fr_1.5fr] items-center gap-6 border-b border-[#4a4a4a] p-2 pb-4"
          >
            <div className="flex flex-row gap-4 items-center cursor-pointer">
              <img
                className="w-12 h-12"
                key={product.id}
                src={product.image}
                alt={product.name}
              />
              <div>{product.name}</div>
            </div>
            <div>{product.quantity}</div>
            <div>Rs. {product.price}</div>
            <div>Rs. {product.quantity * product.price}</div>

            <div
              className={`${
                product.availability ? "text-green-600" : "text-orange-600"
              }`}
            >
              {product.availability ? "Available" : "Not Available"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
