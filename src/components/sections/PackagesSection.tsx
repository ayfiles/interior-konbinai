import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PackagesSection = () => {
  const { currentLang } = useLanguage();
  const packages = [
    {
      title: texts[currentLang].package_project_title,
      description: texts[currentLang].package_project_desc,
      features: texts[currentLang].package_project_features,
    },
    {
      title: texts[currentLang].package_partnership_title,
      description: texts[currentLang].package_partnership_desc,
      features: texts[currentLang].package_partnership_features,
    },
  ];

  // Track visibility for scroll-reveal animations
  const [visible, setVisible] = useState<boolean[]>(
    Array.from({ length: packages.length }, () => false)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute('data-index');
          if (!indexAttr) return;
          const idx = Number(indexAttr);
          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [packages.length]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = relX * 8;
    const rotateX = -relY * 8;
    el.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const resetTilt = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      el.style.transform = '';
    }
  };

  return (
    <section className="relative bg-black py-24 lg:py-32 px-6 lg:px-12">
      {/* Smooth top gradient from charcoal to black */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-charcoal to-black" />
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2
            className="font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            {texts[currentLang].packages_title}
          </h2>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px] max-w-[800px] mx-auto">
            {texts[currentLang].packages_subtitle}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.title}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => resetTilt(index)}
              className={[
                'group relative rounded-[28px] p-8 lg:p-12 flex flex-col',
                // Base look (slightly brighter by default)
                'bg-white/[0.08] border border-white/[0.08]',
                // Scroll reveal
                'opacity-0 translate-y-4 scale-[0.98]',
                visible[index] ? 'opacity-100 translate-y-0 scale-100' : '',
                // Transitions
                'transition duration-700 ease-out will-change-transform transform-gpu',
                // Hover/press interactions
                'hover:-translate-y-1 hover:bg-white/[0.12] hover:border-white/[0.16] active:translate-y-0',
                'shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]',
              ].join(' ')}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Glow overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(120px 120px at 50% 20%, rgba(255,255,255,0.07), rgba(255,255,255,0))' }} />
              
              <div className="space-y-6 flex-grow">
                {/* Title */}
                <h3 className="font-bold text-white text-[26px] lg:text-[30px]" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                  {pkg.title}
                </h3>

                {/* Description */}
                <p className="font-body text-white/85 text-[16px] lg:text-[17px] leading-relaxed">
                  {pkg.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <p className="font-body font-medium text-white/90 text-[14px] uppercase tracking-wide">
                    {texts[currentLang].packages_included || 'Included Services'}
                  </p>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
                        <span className="font-body text-white/80 text-[15px] leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 mt-auto flex justify-center">
                <Button
                  onClick={() => {
                    const packageValue = index === 0 ? 'project-based' : 'creative-partnership';
                    const contactEl = document.getElementById("contact");
                    if (contactEl) {
                      // Set URL param before scrolling
                      window.history.pushState({}, '', `?package=${packageValue}`);
                      contactEl.scrollIntoView({ behavior: "smooth" });
                      // Trigger re-check after scroll
                      setTimeout(() => {
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }, 500);
                    }
                  }}
                  size="lg"
                  className="rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] px-8 py-6 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
                >
                  {texts[currentLang].hero_cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
