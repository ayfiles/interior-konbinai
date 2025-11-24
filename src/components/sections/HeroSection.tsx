import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";
import heroImage2 from "@/assets/hero-image 2.png";
import heroImageMobile from "@/assets/hero-image-mobile.png";
import heroVideoMobile from "@/assets/hero-video 2.webm";
import logoFont from "@/assets/konbinai logo font.png";
import logoFontLightmode from "@/assets/konbinai logo font lightmode.png";
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { texts } from '@/lib/texts';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currentLang } = useLanguage();
  const { theme } = useTheme();

  const heroImages = [heroImage, heroImage2];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-switch images every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToGallery = () => {
    const gallery = document.getElementById("campaign-gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#F2F0EF] dark:bg-black">
      {/* Hero Image Background */}
      <div className="absolute inset-0">
        {/* Mobile Video statt Bild */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroImageMobile}
          className="lg:hidden w-full h-full object-cover opacity-70"
        >
          <source src={heroVideoMobile} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Desktop Images with smooth transition */}
        <div className="hidden lg:block relative w-full h-full overflow-hidden">
          {heroImages.map((img, index) => {
            const isActive = currentImageIndex === index;
            return (
              <img
                key={index}
                src={img}
                alt="Cinematic studio backdrop"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'z-10' : 'z-0'
                } ${isActive ? 'hover:scale-105' : ''}`}
                style={{
                  opacity: isActive ? 0.7 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'opacity 1s ease-in-out, transform 20s ease-out'
                }}
              />
            );
          })}
        </div>
        {/* Gradient Overlay for Navbar */}
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-white/60 dark:from-black/60 to-transparent" />
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-white/80 dark:from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-12 pb-20 lg:pb-24 max-w-[1400px] mx-auto">
        <div
          className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Title */}
          <div className="space-y-3">
            <div className="relative">
              <img
                src={theme === 'light' ? logoFontLightmode : logoFont}
                alt="VISIONBOI Studios"
                className="h-[42px] sm:h-[56px] lg:h-[80px] w-auto object-contain"
              />
            </div>
            <p className="font-body text-black/90 dark:text-white/90 text-[18px] lg:text-[22px] max-w-[600px]">
              {texts[currentLang].hero_subtitle}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center sm:items-start">
            <Button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="w-[70%] sm:w-auto rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] px-10 py-6 transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
            >
              {texts[currentLang].hero_cta}
            </Button>
            <Button
              onClick={scrollToGallery}
              size="lg"
              className="w-[70%] sm:w-auto rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] px-10 py-6 transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
            >
              {texts[currentLang].portfolio}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
