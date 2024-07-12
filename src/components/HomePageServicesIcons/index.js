import React from "react";

const details = [
  {
    title: "Free Shipping",
    subTitle: "Countrywide",
  },
  {
    title: "24 Hours",
    subTitle: "Helping Center",
  },
  {
    title: "Payment",
    subTitle: "Secure System",
  },
  {
    title: "Special",
    subTitle: "Discount Products",
  },
];
export default function HomePageServicesIcons() {
  return (
    <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
      <div className="flex justify-between items-center w-full max-w-[1200px] border-[#58595b] border rounded-md p-[16px]">
        {details.map((i) => (
          <div className="flex flex-col" key={i.title}>
            <div>{i.title}</div>
            <div>{i.subTitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
