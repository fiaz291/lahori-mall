import AppBanner from "@/components/AppBanner";
import HomePageServicesIcons from "@/components/HomePageServicesIcons";
import HomePageSlider from "@/components/HomePageSlider";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-12 pt-12">
      <div className="max-w-[1440px] w-full">
        <Navbar />
        <HomePageSlider />
        <HomePageServicesIcons />
        <HomeProducts />
        <AppBanner />
      </div>
    </main>
  );
}
