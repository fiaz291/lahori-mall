import React from "react";
import { HeartFilled } from "@ant-design/icons";
import useFavorites from "@/app/hooks/favorites";
import "./styles.css";
import { Tooltip } from "antd";
import Link from "next/link";
import { COLORS } from "@/constants";

export default function Wish_List(props) {
  const { favorites } = useFavorites();

  
  return (
    <div>
      <h3 className="mb-[20px]">Favorites to buy | Visit Propducts</h3>
      <div className="container">
        {favorites?.map((fav, index) => (
          <Tooltip title={fav?.product?.name} key={index}>
            <Link
              href={`product/${fav?.product?.slug}`}
              className="product-card-width-fav"
            >
              <div className="product-card-width-fav flex flex-col overflow-hidden rounded bg-[rgba(0,0,0,0.1)] cursor-pointer hover:opacity-80 h-full">
                <div className="w-full product-card-image-height-fav bg-[#fff000] mb-[10px]">
                  <img
                    src={fav?.product?.images?.[0] || "/placeholder.webp"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between p-[6px] gap-[4px]">
                  <div className="truncate ... text-[12px]">
                    {fav?.product?.name}
                  </div>
                </div>
                {!fav?.product?.isDiscount && (
                  <p
                    className="text-[16px] md:text-[14px] font-semibold p-[6px]"
                    style={{ color: COLORS.red }}
                  >
                    {fav?.product?.price} PKR
                  </p>
                )}
                {fav?.product?.isDiscount && (
                  <div className="p-[6px]">
                    <p
                      className="text-[16px] md:text-[14px] font-semibold"
                      style={{ color: COLORS.red }}
                    >
                      {fav?.product?.discountPrice} PKR
                    </p>
                    <p
                      className="text-[12px] md:text-[12px] font-semibold line-through"
                      style={{ color: COLORS.gray }}
                    >
                      {fav?.product?.price} PKR
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
    // <div className="flex flex-col gap-4">
    //   <div className="flex gap-3 items-center">
    //     <HeartFilled />
    //     <h3 className="text-[15px]">Wish List</h3>
    //   </div>
    //   <div className="grid items-center grid-cols-[4fr_1fr_1fr_2fr_1.5fr] gap-6 bg-[#007a3b] p-2  text-white">
    //     {tableHeader.map((heading) => (
    //       <div key={heading} className="font-bold text-left text-[12px]">
    //         {heading}
    //       </div>
    //     ))}
    //   </div>
    //   <div className="max-h-[220px] overflow-y-auto">
    //     {products.map((product) =>
    //       fav.product.isFavorite ? (
    //         <div
    //           key={product.id}
    //           className="grid items-center grid-cols-[4fr_1fr_1fr_2fr_1.5fr] gap-6 border-b border-[#4a4a4a] p-2 pb-4 text-[12px]"
    //         >
    //           <div className="flex flex-row gap-4 items-center cursor-pointer">
    //             <img
    //               className="w-12 h-12"
    //               src={product.image}
    //               alt={product.name}
    //             />
    //             <div>{product.name}</div>
    //           </div>
    //           <div>{product.quantity}</div>
    //           <div>Rs. {product.price}</div>
    //           <div>Rs. {product.quantity * product.price}</div>
    //           <div
    //             className={`${
    //               product.availability ? "text-green-600" : "text-orange-600"
    //             }`}
    //           >
    //             {product.availability ? "Available" : "Not Available"}
    //           </div>
    //         </div>
    //       ) : null
    //     )}
    //   </div>
    // </div>
  );
}
