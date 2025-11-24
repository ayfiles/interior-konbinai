import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { texts } from '@/lib/texts';
import konbinaiLogo from '@/assets/konbinai logo.svg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentLang, setCurrentLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Glassmorphism Theme Switch
  const themeSwitchBtn = (
    <button
      aria-label="Toggle theme"
      type="button"
      className="rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] p-2 w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );

  // Glassmorphism Language Switch: show only current language (EN or DE)
  const langSwitchBtn = (
    <button
      aria-label="Switch language"
      type="button"
      className="rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] px-8 py-2 whitespace-nowrap transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
      onClick={() => setCurrentLang(currentLang === 'EN' ? 'DE' : 'EN')}
    >
      {currentLang}
    </button>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const gallery = document.getElementById("campaign-gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/[0.06] dark:bg-white/[0.06] backdrop-blur-frosted border-b border-black/[0.12] dark:border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src={konbinaiLogo}
                alt="konbinai logo"
                className="h-[30px] lg:h-[36px] w-auto brightness-0 dark:brightness-[1] transition-all duration-300"
                draggable={false}
              />
            </Link>
            <div className="flex items-center gap-2 md:gap-4 h-16 md:h-auto">
              {themeSwitchBtn}
              {langSwitchBtn}
              <Button
                onClick={scrollToContact}
                variant="default"
                size="lg"
                className="rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] px-8 transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
              >
                {texts[currentLang].contact_us}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#F2F0EF]/95 dark:bg-black/95 backdrop-blur-frosted animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            <button
              onClick={scrollToGallery}
              className="font-body text-[20px] text-black dark:text-white tracking-[0.02em] hover:text-black/80 dark:hover:text-white/80 transition-colors"
            >
              Content Creation
            </button>
            <Button
              onClick={scrollToContact}
              variant="default"
              size="lg"
              className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[16px] px-12 w-full max-w-xs"
            >
              {texts[currentLang].contact_us}
            </Button>
            <div className="mt-4 flex flex-col items-center gap-3 w-full">
              {themeSwitchBtn}
              {langSwitchBtn}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
