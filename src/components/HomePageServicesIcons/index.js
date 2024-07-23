import React from "react";
import { FaTruck, FaHeadset, FaShieldAlt, FaTags } from "react-icons/fa"; // Import icons from react-icons

const details = [
  {
    title: "Free Shipping",
    subTitle: "Countrywide",
    icon: <FaTruck />,
  },
  {
    title: "24 Hours",
    subTitle: "Helping Center",
    icon: <FaHeadset />,
  },
  {
    title: "Payment",
    subTitle: "Secure System",
    icon: <FaShieldAlt />,
  },
  {
    title: "Special",
    subTitle: "Discount Products",
    icon: <FaTags />,
  },
];

export default function HomePageServicesIcons() {
  return (
    <div className="flex justify-center px-[12px] ">
      <div className="flex w-full justify-between max-w-[1200px] border-[#58595b] border rounded-md mx-[20px] py-[24px] px-[50px]">
        {details.map((i, index) => (
          <div className="flex gap-10" key={i.title}>
            <div className="flex items-center gap-4 text-center">
              <div className=" text-[60px] text-[#009944]"> {i.icon}</div>
              <div>
                <div className="text-[#7d7d7d] font-semibold">{i.title}</div>
                <div className="text-[#7d7d7d]">{i.subTitle}</div>
              </div>
            </div>
            {index < details.length - 1 && (
              <div className="pl-4 pr-10">
                <div className=" h-full border-r border-[#58595b]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
