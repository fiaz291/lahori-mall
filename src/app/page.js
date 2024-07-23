import AppBanner from "@/components/AppBanner";
import HomePageServicesIcons from "@/components/HomePageServicesIcons";
import HomePageSlider from "@/components/HomePageSlider";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopCategoriesCatalog from "@/components/TopCategoriesCatalog";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col max-w-[1440px] w-full gap-12">
        <Navbar />
        <HomePageSlider />
        <HomePageServicesIcons />
        <HomeProducts />
        <AppBanner />
        <TopCategoriesCatalog />
        <Footer />
      </div>
    </main>
  );
}
