"use client";
import AppBanner from "@/components/AppBanner";
import HomePageServicesIcons from "@/components/HomePageServicesIcons";
import HomePageSlider from "@/components/HomePageSlider";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import useWindowSize from "./hooks/windowSize";
import NewTrending from "@/components/NewTrending";
import Footer from "@/components/Footer";
import BestSellingSlider from "@/components/BestSellingSlider";
import HomeTabsProducts from "@/components/HomeTabsProducts";
import TKSServices from "@/components/TKSServices";
import TKSHomePageProducts from "@/components/TKSHomePageProducts";

export default function Home() {
  return (
    <main
      className={"flex min-h-screen flex-col items-center justify-between pb-12"}
    >
      <div className="w-full">
        <Navbar defaultOpenMegaMenu />
        {/* <HomePageSlider /> */}
        <div className="outer">
          <div className="inner">
            <div className="w-full h-[100px] mt-[26px]" style={{ borderRadius: 20, background: "linear-gradient(to right, #f953c6, #b91d73, #ff0066)" }} />
          </div>
        </div>
        {/* <HomePageServicesIcons /> */}
        <BestSellingSlider />
        <HomeTabsProducts />
        <div className="outer">
          <div className="inner">
            <div className="w-full h-[100px] mt-[26px]" style={{ borderRadius: 20, background: "linear-gradient(to right, #f953c6, #b91d73, #ff0066)" }} />
          </div>
        </div>
        <TKSServices />
        <TKSHomePageProducts />
        {/* <HomeProducts /> */}
        <AppBanner />
        {/* <NewTrending /> */}
        <Footer />
      </div>
    </main>
  );
}
