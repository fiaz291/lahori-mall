import { COLORS } from "@/constants";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import "./styles.css";
import { Tooltip } from "antd";
import Link from "next/link";
import useFavorites from "@/app/hooks/favorites";

export default function ProductCard({ product, image }) {
  const { name, slug } = product;
  const { favorites } = useFavorites();

  const isProductIsFavorite = useCallback(() => {
    const isAlreadyThere = favorites.find(
      (item) => item.productId === product.id
    );
    if (isAlreadyThere) {
      return true;
    }
    return false;
  }, [favorites, favorites?.length]);

  return (
    <Tooltip title={name}>
      <Link href={`product/${slug}`}>
        <div className="product-card-width flex flex-col overflow-hidden rounded bg-[rgba(0,0,0,0.1)] cursor-pointer hover:opacity-80 h-full">
          <div className="w-full product-card-image-height bg-[#fff000] mb-[10px]">
            <img
              src={image ? image : "/placeholder.webp"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between p-[6px] gap-[4px]">
            <div className="truncate ...">{name}</div>
            {isProductIsFavorite() ? (
              <div style={{ color: COLORS.red }}>
                {" "}
                <HeartFilled />
              </div>
            ) : (
              <div style={{ color: COLORS.red }}>
                {" "}
                <HeartOutlined />
              </div>
            )}
          </div>
          {!product?.isDiscount && (
            <p
              className="text-[16px] md:text-[14px] font-semibold p-[6px]"
              style={{ color: COLORS.red }}
            >
              {product?.price} PKR
            </p>
          )}
          {product?.isDiscount && (
            <div className="p-[6px]">
              <p
                className="text-[16px] md:text-[14px] font-semibold"
                style={{ color: COLORS.red }}
              >
                {product?.discountPrice} PKR
              </p>
              <p
                className="text-[12px] md:text-[12px] font-semibold line-through"
                style={{ color: COLORS.gray }}
              >
                {product?.price} PKR
              </p>
            </div>
          )}
        </div>
      </Link>
    </Tooltip>
  );
}
