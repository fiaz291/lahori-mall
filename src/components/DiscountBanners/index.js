import React from "react";

export default function DiscountBanners() {
  return (
    <div className="flex w-full justify-center items-center my-10 md:my-20">
      <div className="max-w-[1200px] w-full px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="col-span-1 md:col-span-3 h-[200px] md:h-[400px] lg:h-[500px] bg-[#b2b2b2]"></div>
          <div className="col-span-1 md:col-span-2 h-[200px] md:h-[300px] bg-[#e0e1e0]"></div>
          <div className="h-[200px] md:h-[300px] bg-[#e0e1e0]"></div>
          <div className="hidden md:block"></div>
        </div>
      </div>
    </div>
  );
}
