import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import UseCaseSection from "@/components/sections/UseCaseSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import GallerySection from "@/components/sections/GallerySection";
import PackagesSection from "@/components/sections/PackagesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F2F0EF] dark:bg-black">
      <Navbar />
      <HeroSection />
      <UseCaseSection />
      <HowItWorksSection />
      <GallerySection />
      <PackagesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
