import { COLORS } from "@/constants";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React from "react";
import "./styles.css";
import { useRouter } from "next/navigation";
import { Tooltip } from "antd";

export default function ProductCard({ product, image }) {
  const { name, isFavorite, price, slug, isDiscount, discountPrice } = product;
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`product/${slug}`);
  };
  return (
    <Tooltip title={name}>
      <div
        className="product-card-width flex flex-col overflow-hidden rounded bg-[rgba(0,0,0,0.1)] cursor-pointer hover:opacity-80 h-full"
        onClick={handleNavigation}
      >
        <div className="w-full product-card-image-height bg-[#fff000] mb-[10px]">
          <img
            src={image ? image : "/placeholder.webp"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between p-[6px] gap-[4px]">
          <div className="truncate ...">{name}</div>
          {isFavorite ? (
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
    </Tooltip>
  );
}
