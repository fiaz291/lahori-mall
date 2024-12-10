import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function Product_Route({ tag }) {
  const router = useRouter();
  const handleRedirect = (redirectTo) => {
    router.push(redirectTo);
  };
  return (
    <div className="flex w-full">
      <div className="flex gap-2 text-[#6e6e6e] items-center text-sm md:text-base lg:text-xl">
        <p className="cursor-pointer" onClick={() => handleRedirect("/")}>
          Home
        </p>
        <FaChevronRight />
        <p className="cursor-pointer" onClick={() => handleRedirect("/tags")}>
          Tags
        </p>
        <FaChevronRight />
        <p
          className="text-[#3e3e3e] font-semibold cursor-pointer"
          onClick={() => handleRedirect(`/tags/${tag?.key}`)}
        >
          {tag?.value}
        </p>
      </div>
    </div>
  );
}
