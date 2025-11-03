import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';

const OfferingsSection = () => {
  const { currentLang } = useLanguage();
  const offerings = [
    {
      title: texts[currentLang].service_ai_title,
      description: texts[currentLang].service_ai_desc,
    },
    {
      title: texts[currentLang].service_product_title,
      description: texts[currentLang].service_product_desc,
    },
    {
      title: texts[currentLang].service_motion_title,
      description: texts[currentLang].service_motion_desc,
    },
    {
      title: texts[currentLang].service_direction_title,
      description: texts[currentLang].service_direction_desc,
    },
  ];

  // Track visibility for scroll-reveal animations
  const [visible, setVisible] = useState<boolean[]>(
    Array.from({ length: offerings.length }, () => false)
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
  }, [offerings.length]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5..0.5
    const rotateY = relX * 8; // degrees
    const rotateX = -relY * 8; // degrees
    el.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const resetTilt = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      el.style.transform = '';
    }
  };

  return (
    <section className="relative bg-charcoal py-24 lg:py-32 px-6 lg:px-12">
      {/* Smooth top gradient from previous black section into charcoal */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-black to-charcoal" />
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2
            className="font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            {texts[currentLang].services_title}
          </h2>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px] max-w-[800px] mx-auto">
            {texts[currentLang].services_subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {offerings.map((offering, index) => (
            <div
              key={offering.title}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => resetTilt(index)}
              className={[
                'group relative rounded-[28px] p-8 lg:p-12 space-y-3',
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
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              {/* Glow overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(120px 120px at 50% 20%, rgba(255,255,255,0.07), rgba(255,255,255,0))' }} />
              <h3 className="font-display font-bold text-white text-[22px] lg:text-[24px] whitespace-nowrap truncate">
                <span className="inline-block align-middle" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>{offering.title}</span>
                <span className="inline-block align-middle ml-2 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
              </h3>
              <p className="font-body text-white/85 text-[15px] lg:text-[16px] leading-relaxed">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
