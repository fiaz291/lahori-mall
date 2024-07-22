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
      <div className="flex w-full justify-between max-w-[1200px] border-[#58595b] border rounded-md mx-[20px] p-[24px] pl-[50px]">
        {details.map((i, index) => (
          <div className="flex  items-center text-center gap-8" key={i.title}>
            <div className=" text-[60px] text-[#009944]"> {i.icon}</div>
            <div>
              <div className="text-[#58595b] font-semibold">{i.title}</div>
              <div className="text-[#58595b]">{i.subTitle}</div>
            </div>
            <div className="pr-8">
              {index < details.length - 1 && (
                <div className=" h-[60px] border-r border-[#58595b]"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
