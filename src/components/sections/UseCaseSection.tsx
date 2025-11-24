import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';
import banner1 from '@/assets/banner-1.png';
import banner2 from '@/assets/banner-2.png';
import banner3 from '@/assets/banner-3.png';
import banner4 from '@/assets/banner-4.png';

const UseCaseSection = () => {
  const { currentLang } = useLanguage();
  
  const useCases = [
    {
      title: texts[currentLang].usecase_estate_title,
      subtitle: texts[currentLang].usecase_estate_subtitle,
      desc: texts[currentLang].usecase_estate_desc,
      benefit: texts[currentLang].usecase_estate_benefit,
      image: banner1,
      hoverColor: 'rgba(0, 0, 139, 0.15)', // dunkel blau
    },
    {
      title: texts[currentLang].usecase_airbnb_title,
      subtitle: texts[currentLang].usecase_airbnb_subtitle,
      desc: texts[currentLang].usecase_airbnb_desc,
      benefit: texts[currentLang].usecase_airbnb_benefit,
      image: banner2,
      hoverColor: 'rgba(220, 20, 60, 0.15)', // rot
    },
    {
      title: texts[currentLang].usecase_developer_title,
      subtitle: texts[currentLang].usecase_developer_subtitle,
      desc: texts[currentLang].usecase_developer_desc,
      benefit: texts[currentLang].usecase_developer_benefit,
      image: banner3,
      hoverColor: 'rgba(0, 100, 0, 0.15)', // dunkel grün
    },
    {
      title: texts[currentLang].usecase_designer_title,
      subtitle: texts[currentLang].usecase_designer_subtitle,
      desc: texts[currentLang].usecase_designer_desc,
      benefit: texts[currentLang].usecase_designer_benefit,
      image: banner4,
      hoverColor: 'rgba(255, 215, 0, 0.15)', // gelb
    },
  ];

  // Track visibility for scroll-reveal animations
  const [visible, setVisible] = useState<boolean[]>(
    Array.from({ length: useCases.length }, () => false)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const baseTransforms = useRef<number[]>(
    Array.from({ length: useCases.length }, () => 0)
  );

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
  }, [useCases.length]);

  // Update base transforms when visibility changes
  useEffect(() => {
    useCases.forEach((_, index) => {
      const isEven = index % 2 === 0;
      const slideDistance = 100;
      baseTransforms.current[index] = visible[index] 
        ? 0 
        : (isEven ? -slideDistance : slideDistance);
    });
  }, [visible, useCases.length]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = relX * 6;
    const rotateX = -relY * 6;
    // Combine base slide transform with tilt effect
    const baseX = baseTransforms.current[index];
    el.style.transform = `perspective(800px) translateX(${baseX}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const resetTilt = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      // Reset to base slide position only
      const baseX = baseTransforms.current[index];
      el.style.transform = `translateX(${baseX}px)`;
    }
  };

  return (
    <section className="relative bg-[#F2F0EF] dark:bg-charcoal py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Smooth top gradient from previous section */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-white dark:from-black to-[#F2F0EF] dark:to-charcoal z-10" />
      
      {/* Grid Overlay with fade out */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          color: 'currentColor',
          maskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 100%)',
        }}
      />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2
            className="font-bold text-black dark:text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            {texts[currentLang].usecase_title}
          </h2>
          <p className="font-body text-black/85 dark:text-white/85 text-[18px] lg:text-[20px] max-w-[800px] mx-auto">
            {texts[currentLang].usecase_subtitle}
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => {
            // Determine slide direction: even indices from left, odd from right
            const isEven = index % 2 === 0;
            const slideDistance = 100;
            const translateX = visible[index] 
              ? 0 
              : (isEven ? -slideDistance : slideDistance);
            
            // Update base transform ref for hover tilt
            baseTransforms.current[index] = translateX;
            
            return (
            <div
              key={useCase.title}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => resetTilt(index)}
              className={[
                'group relative rounded-[28px] overflow-hidden',
                'bg-black/[0.08] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08]',
                // Transitions for slide and opacity
                'transition-[opacity,transform] duration-700 ease-out will-change-transform transform-gpu',
                // Hover/press interactions
                'hover:-translate-y-1 hover:bg-black/[0.12] dark:hover:bg-white/[0.12] hover:border-black/[0.16] dark:hover:border-white/[0.16] active:translate-y-0',
                'shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]',
              ].join(' ')}
              style={{ 
                opacity: visible[index] ? 1 : 0,
                transform: `translateX(${translateX}px)`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              {/* Color glow overlay - smooth background color on hover */}
              <div 
                className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0" 
                style={{ 
                  background: useCase.hoverColor,
                  transition: 'opacity 0.5s ease-out'
                }} 
              />
              
              {/* Glow overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{ background: 'radial-gradient(120px 120px at 50% 20%, rgba(255,255,255,0.07), rgba(255,255,255,0))' }} />
              
              {/* Image */}
              <div className="relative w-full h-[240px] lg:h-[280px] overflow-hidden">
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 space-y-4 relative z-10">
                {/* Subtitle */}
                <p className="font-body font-medium text-[13px] lg:text-[14px] text-black/70 dark:text-white/70 uppercase tracking-wider">
                  {useCase.subtitle}
                </p>
                
                {/* Title */}
                <h3 className="font-display font-bold text-black dark:text-white text-[24px] lg:text-[28px] leading-tight">
                  {useCase.title}
                </h3>
                
                {/* Description */}
                <p className="font-body text-black/75 dark:text-white/75 text-[15px] lg:text-[16px] leading-relaxed">
                  {useCase.desc}
                </p>
                
                {/* Benefit (emotional) */}
                <p className="font-body italic text-black/85 dark:text-white/85 text-[15px] lg:text-[16px] leading-relaxed pt-2 border-t border-black/[0.08] dark:border-white/[0.08]">
                  {useCase.benefit}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;

