import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import React from "react";

export default function Footer() {
  return (
    <div className="flex items-center justify-center flex-col px-4 gap-3">
      <div className="max-w-[1200px]">
        <div
          className={
            "flex items-center flex-col justify-center gap-10 my-16 w-full bg-[#151515] h-[350px] p-20 px-10"
          }
        >
          <p className="text-[28px]">
            Get very modern technology in the present
          </p>
          <div className=" flex justify-center items-center gap-10">
            <p className="text-[16px]">
              Download our new app today! Dont miss our mobile-only offers
            </p>
            <button className="p-3 px-7 rounded-md text-[16px] bg-[#00803e]">
              Shop Now
            </button>
          </div>
        </div>
        <div
          className={
            "grid items-start mt-32 mb-10 gap-20  grid-cols-[2fr_5fr] text-[15px] font-[200]"
          }
        >
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 justify-center items-center w-[300px]">
              <img src="/logo.png" className="w-[220px] h-[220px]" />
              <p className="text-[16px]">Rehman Garden Lahore</p>
            </div>
            <p className="font-extralight text-[16px] text-[#c1c1c1]">
              FOLLOW US
            </p>
            <div className="flex gap-6 text-[#00803e] text-[19px]">
              <FaFacebookF className="cursor-pointer" />
              <FaTwitter className="cursor-pointer" />
              <FaInstagram className="cursor-pointer" />
              <FaLinkedinIn className="cursor-pointer" />
              <FaWhatsapp className="cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-[200px]"></div>
            <div className="grid items-start gap-20 grid-cols-3">
              <div className="flex flex-col gap-3">
                <p className="text-[22px] text-[#00803e] mb-4 font-normal">
                  COMPANY
                </p>
                <p className="cursor-pointer">Profile</p>
                <p className="cursor-pointer">About Us</p>
                <p className="cursor-pointer">Contact</p>
                <p className="cursor-pointer">Address</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[22px] text-[#00803e] mb-4 font-normal">
                  COMMUNITY
                </p>
                <p className="cursor-pointer">Facebook</p>
                <p className="cursor-pointer">X</p>
                <p className="cursor-pointer">Instagram</p>
                <p className="cursor-pointer">LinkedIn</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[22px] text-[#00803e] mb-4 font-normal">
                  RETURNS
                </p>
                <p className="cursor-pointer">FAQs</p>
                <p className="cursor-pointer">Size Guide</p>
                <p className="cursor-pointer">Contact Us</p>
                <p className="cursor-pointer">Sell With Us</p>
                <p className="cursor-pointer">Sell With Us</p>
                <p className="cursor-pointer">Sitemap FAQs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 border-0 bg-[#494949] w-full my-5" />
        <div className="flex w-full justify-between text-[16px] mb-10 font-extralight">
          <div className="flex gap-12">
            <p>Status</p>
            <p>Contact Us</p>
          </div>
          <div>Copyright © Lahori Mall Impex</div>
        </div>
      </div>
    </div>
  );
}
