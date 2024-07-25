"use client";
import AppBanner from "@/components/AppBanner";
import HomePageServicesIcons from "@/components/HomePageServicesIcons";
import HomePageSlider from "@/components/HomePageSlider";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopCategoriesCatalog from "@/components/TopCategoriesCatalog";
import DiscounntBanners from "@/components/DiscountBanners";
import NewTrending from "@/components/NewTrending";
import useWindowSize from "./hooks/windowSize";

export default function Home() {
  const { width, height } = useWindowSize();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pb-12 ${
        width < 900 ? "pt-0" : "pt-12"
      }`}
    >
      <div className="max-w-[1440px] w-full">
        <Navbar />
        <HomePageSlider />
        <HomePageServicesIcons />
        <HomeProducts />
        <AppBanner />
        {/* <TopCategoriesCatalog /> */}
        <DiscounntBanners />
        <NewTrending />
        <Footer />
      </div>
    </main>
  );
}
