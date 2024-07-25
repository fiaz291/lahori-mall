import useWindowSize from "@/app/hooks/windowSize";
import { COLORS } from "@/constants";
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
  const { isMobile } = useWindowSize();
  return (
    <div className="flex flex-col justify-center items-center pl-[12px] pr-[12px] gap-4">
      {!isMobile && (
        <div className="flex justify-between items-center w-full max-w-[1200px] border-[#58595b] border rounded-md p-[16px]">
          {details.map((i) => (
            <div className="flex flex-col" key={i.title}>
              <div>{i.title}</div>
              <div>{i.subTitle}</div>
            </div>
          ))}
        </div>
      )}
      {isMobile && (
        <div className="flex flex-col justify-between items-center w-full max-w-[1200px] border-[#58595b] border p-[16px] gap-[10px]">
          {details.map((i) => (
            <div
              className="flex flex-col w-full p-1 hover:opacity-80"
              key={i.title}
              style={{ background: COLORS.green }}
            >
              <div className="text-center text-white">{i.title}</div>
              <div className="text-center text-white">{i.subTitle}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
