import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import GallerySection from "@/components/sections/GallerySection";
import OfferingsSection from "@/components/sections/OfferingsSection";
import PackagesSection from "@/components/sections/PackagesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <GallerySection />
      <OfferingsSection />
      <PackagesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
