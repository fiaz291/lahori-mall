import useWindowSize from "@/app/hooks/windowSize";
import { COLORS } from "@/constants";
import { Button, Flex } from "antd";
import React, { useState } from "react";
import MegaMenu from "../MegaMenu";
import Slider from "react-slick";
import { MenuOutlined } from "@ant-design/icons";
import "./styles.css";
import Link from "next/link";

export default function HomePageSlider({ hideSlider, defaultOpenMegaMenu }) {

  const { isMobile, isTab } = useWindowSize();
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
        <div className="inner relative">
          <Flex gap={8} className="overflow-x-scroll scrollbar-none bg-[#005ed4]">
            {!isMobile &&
              <Button icon={<MenuOutlined />} style={{ border: "none", padding: "0 30px", height: 60, background: "#0047A0", borderRadius: "unset", color: "white", fontSize: 16 }} onClick={() => setOpen(!open)}>All Categories</Button>
            }
            <Link href="/best-sellers">
              <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16, background: 'transparent', color: '#fff' }}>Best Sellers</Button>
            </Link>
            <Link href="/super-deals">
              <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16, background: 'transparent', color: '#fff' }}>Super Deals</Button>
            </Link>
            {/* <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16, background: 'transparent', color: '#fff' }}>Super Deals</Button> */}
            <Link href="/free-delivery">
              <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16, background: 'transparent', color: '#fff' }}>Free Delivery</Button>
            </Link>
            <Link href="/top-of-week">
              <Button style={{ border: "none", padding: "0 30px", height: 60, fontSize: 16, background: 'transparent', color: '#fff' }}>Top of Week</Button>
            </Link>
            {/* <Button style={{ border: 'none', padding: "0 30px", height: 60, fontSize: 16 }}>asasdasd</Button> */}
          </Flex>
          {!hideSlider &&
            <div className="flex justify-end w-full">
              <div className="w-full" style={{ maxWidth: !isTab ? 'calc(100% - 184px)' : "100%" }}>
                {/* <Carousel showArrows="always"> */}
                <Slider {...settings}>
                  <img src="/slide1.png" className="max-h-full min-h-full md:max-h-[400px] min-h-[400px]" />
                  <img src="/slide2.webp" className="max-h-full min-h-full md:max-h-[400px] min-h-[400px]" />
                  <img src="/slide3.webp" className="max-h-full min-h-full md:max-h-[400px] min-h-[400px]" />
                </Slider>
              </div>
            </div>
          }
          <MegaMenu
            open={open}
            defaultOpen={defaultOpenMegaMenu && !isTab}
            top="60px"
            left="unset"
            defaultSelected={false}
          />


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

  );
}
