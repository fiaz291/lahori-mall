import { COLORS } from "@/constants";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import "./styles.css";
import { Tooltip } from "antd";
import Link from "next/link";
import useFavorites from "@/app/hooks/favorites";

export default function TopSellingProductCard({ product, image }) {
  const { name, slug } = product;
  const { favorites } = useFavorites();

  const isProductIsFavorite = useCallback(() => {
    const isAlreadyThere = favorites?.find(
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
        <div className="product-card-width flex flex-col overflow-hidden bg-white] cursor-pointer hover:opacity-80 h-full pt-[10px]" style={{border: '1px solid black', borderRadius: 2, background: 'rgba(0,0,0,0.1)'}}>
          <div className="w-full product-card-image-height mb-[10px] flex justify-center">
            <img
              src={image ? image : "http://image.gmarket.co.kr/hanbando/202411/144ec47d-f3fb-4543-9de3-a78313aa7e22.jpg"}
              className="w-[200px] h-[200px] object-cover"
              style={{borderRadius: '50%'}}
            />
          </div>
          {/* <div className="flex justify-between p-[6px] gap-[4px]">
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
          </div> */}
          {/* {!product?.isDiscount && ( */}
            <p
              className="text-[16px] text-center md:text-[14px] p-[6px]"
            >
              {product?.name}
            </p>
            <p
              className="text-[16px] text-center md:text-[14px] mt-[4px]"
            >
              <span className="font-semibold text-[32px]">{product?.price}</span> PKR
            </p>
          {/* )} */}
          {/* {product?.isDiscount && (
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
          )} */}
        </div>
      </Link>
    </Tooltip>
  );
}
