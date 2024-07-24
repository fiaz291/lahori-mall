import React from "react";

export default function DiscounntBanners() {
  return (
    <div className="flex w-full justify-center items-center my-[40px]">
      <div className="max-w-[1200px] w-full px-[24px]">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 h-[500px] bg-[#b2b2b2]"></div>
          <div className="col-span-2 h-[300px] bg-[#e0e1e0]"></div>
          <div className="h-[300px] bg-[#e0e1e0]"></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
