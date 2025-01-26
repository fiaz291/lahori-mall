import React from "react";
import { HeartFilled } from "@ant-design/icons";
import useFavorites from "@/app/hooks/favorites";
import "./styles.css";
import { Tooltip } from "antd";
import Link from "next/link";
import { COLORS } from "@/constants";

export default function Wish_List() {
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
  );
}
