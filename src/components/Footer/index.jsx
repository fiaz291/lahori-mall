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
      <div className="max-w-[1200px] w-full">
        <div className="flex items-center flex-col justify-center gap-6 my-10 w-full p-10 md:p-20 text-center">
          <p className="text-xl md:text-2xl lg:text-3xl">
            Get very modern technology in the present
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10">
            <p className="text-sm md:text-base lg:text-lg">
              Download our new app today! Don&apos;t miss our mobile-only offers
            </p>
            <button className="p-2 md:p-3 px-4 md:px-7 rounded-md text-sm md:text-base bg-[#00803e]  text-white">
              Shop Now
            </button>
          </div>
        </div>
        <div className="grid items-start gap-10 md:gap-20 mt-10 mb-10 grid-cols-1 md:grid-cols-[220px_1fr] text-sm font-light">
          <div className="flex flex-col gap-6 items-center md:items-start">
            <div className="flex flex-col gap-4 justify-center items-center w-full md:w-auto">
              <img
                src="/logo.png"
                className="w-[120px] h-[120px] md:w-[220px] md:h-[220px]"
              />
              <p className="text-base md:text-lg">Rehman Garden Lahore</p>
            </div>
            <p className="font-extralight text-base md:text-lg text-[#949494]">
              FOLLOW US
            </p>
            <div className="flex gap-4 md:gap-6 text-[#00803e] text-lg md:text-xl">
              <FaFacebookF className="cursor-pointer" />
              <FaTwitter className="cursor-pointer" />
              <FaInstagram className="cursor-pointer" />
              <FaLinkedinIn className="cursor-pointer" />
              <FaWhatsapp className="cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-10 md:h-20"></div>
            <div className="grid items-start gap-10 md:gap-20 grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-lg md:text-xl text-[#00803e] mb-2 md:mb-4 font-normal">
                  COMPANY
                </p>
                <p className="cursor-pointer">Profile</p>
                <p className="cursor-pointer">About Us</p>
                <p className="cursor-pointer">Contact</p>
                <p className="cursor-pointer">Address</p>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-lg md:text-xl text-[#00803e] mb-2 md:mb-4 font-normal">
                  COMMUNITY
                </p>
                <p className="cursor-pointer">Facebook</p>
                <p className="cursor-pointer">X</p>
                <p className="cursor-pointer">Instagram</p>
                <p className="cursor-pointer">LinkedIn</p>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-lg md:text-xl text-[#00803e] mb-2 md:mb-4 font-normal">
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
        <div className="flex flex-col md:flex-row w-full justify-between text-sm md:text-base font-extralight mb-5">
          <div className="flex gap-4 md:gap-12 justify-center md:justify-start mb-4 md:mb-0">
            <p>Status</p>
            <p>Contact Us</p>
          </div>
          <div className="text-center md:text-left">
            Copyright © Lahori Mall Impex
          </div>
        </div>
      </div>
    </div>
  );
}
