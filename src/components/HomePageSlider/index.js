import useWindowSize from "@/app/hooks/windowSize";
import { COLORS } from "@/constants";
import { Button, Flex } from "antd";
import React, { useState } from "react";
import MegaMenu from "../MegaMenu";
import { Carousel, useCarousel } from "nuka-carousel";
import Slider from "react-slick";
import { MenuOutlined } from "@ant-design/icons";
import "./styles.css";
import Link from "next/link";

export default function HomePageSlider() {

  const { isMobile } = useWindowSize();
  const [open, setOpen] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (

    <div className="flex flex-col w-full pt-8">
      <div className="outer">
        <div className="inner">
          <Flex gap={8} className="overflow-scroll">
            <div className="relative">
              <Button icon={<MenuOutlined />} style={{ border: "none", padding: "0 30px", height: 60, background: "#0047A0", borderRadius: "unset", color: "white", fontSize: 16 }} onClick={() => setOpen(!open)}>All Categories</Button>
              <MegaMenu
                open={open}
                defaultOpen={false}
                top="58px"
                left="unset"
                defaultSelected={false}
              />
            </div>
            <Link href="/tags/sample-category">
              <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16 }}>Best</Button>
            </Link>
            <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16 }}>Super Deals</Button>
            <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16 }}>Free Delivery</Button>
            <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16 }}>Top of Week</Button>
            {/* <Button style={{ border: 'none', padding: "0 30px", height: 60, fontSize: 16 }}>asasdasd</Button> */}
          </Flex>

        </div>
      </div>
      <div className="outer">
        <div className="inner">
          <div className="w-full">
            {/* <Carousel showArrows="always"> */}
            <Slider {...settings}>
              <img src="/slide1.png" className=" max-h-[400px]" />
              <img src="/slide2.webp" className=" max-h-[400px]" />
              <img src="/slide3.webp" className=" max-h-[400px]" />
            </Slider>

            {/* <img src="/slide-1.webp" className="w-[400px] max-h-[400px] object-cover" /> */}
            {/* <div className="flex items-center absolute right-10 bottom-10 gap-4">
          <div
            className={`text-white ${isMobile ? "text-[14px]" : "text-[20px]"
              } shadow bg-[rgba(0,0,0,0.6)] p-[10px]`}
          >
            An exclusive selection of this season's trends.
          </div>

          <button
            className={`pt-[2px] pb-[2px] text-white ${isMobile ? "text-[10px]" : "text-[20px]"
              } rounded ${isMobile ? "w-[80px] h-[40px]" : "w-[164px] h-[62px]"}`}
            style={{ background: COLORS.green }}
          >
            Shop Now
          </button>
        </div> */}
          </div>
        </div>
      </div>
    </div>

  );
}
