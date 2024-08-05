import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function Product_Route({ prod }) {
  console.log({ prod });
  const router = useRouter();
  const handleRedirect = (redirectTo) => {
    router.push(redirectTo);
  };
  return (
    <div className="flex w-full">
      <div className="flex gap-2 text-[#6e6e6e] items-center text-sm md:text-base lg:text-xl">
        <p className="cursor-pointer" onClick={()=>handleRedirect('/')}>Home</p>
        <FaChevronRight />
        <p className="cursor-pointer" onClick={()=>handleRedirect(`/category/${prod?.category?.slug}`)}>{prod?.category?.name}</p>
        <FaChevronRight />
        <p className="text-[#3e3e3e] font-semibold cursor-pointer" onClick={()=>handleRedirect(`/product/${prod?.slug}`)}>{prod?.name?.split(" "). splice(0,4). join(" ")+"...."}</p>
      </div>
    </div>
  );
}
