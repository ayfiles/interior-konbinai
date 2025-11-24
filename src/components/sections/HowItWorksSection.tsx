import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';
import { ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const { currentLang } = useLanguage();
  
  const steps = [
    {
      number: texts[currentLang].howitworks_step1_number,
      title: texts[currentLang].howitworks_step1_title,
    },
    {
      number: texts[currentLang].howitworks_step2_number,
      title: texts[currentLang].howitworks_step2_title,
    },
    {
      number: texts[currentLang].howitworks_step3_number,
      title: texts[currentLang].howitworks_step3_title,
    },
  ];

  // Track visibility for scroll-reveal animations
  const [visible, setVisible] = useState<boolean[]>(
    Array.from({ length: steps.length }, () => false)
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
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [steps.length]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = relX * 4;
    const rotateX = -relY * 4;
    el.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const resetTilt = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      el.style.transform = '';
    }
  };

  return (
    <section className="relative bg-white dark:bg-black py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Smooth top gradient from previous section */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-[#F2F0EF] dark:from-charcoal to-white dark:to-black z-10" />
      
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
            {texts[currentLang].howitworks_title}
          </h2>
          <p className="font-body text-black/85 dark:text-white/85 text-[18px] lg:text-[20px] max-w-[800px] mx-auto">
            {texts[currentLang].howitworks_subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mb-12 lg:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              return (
                <div key={step.number} className="relative">
                  <div
                    ref={(el) => (cardRefs.current[index] = el)}
                    data-index={index}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => resetTilt(index)}
                    className={[
                      'group relative rounded-[28px] p-8 lg:p-12 flex flex-col items-center text-center',
                      'bg-black/[0.08] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08]',
                      // Scroll reveal
                      'opacity-0 translate-y-8 scale-[0.96]',
                      visible[index] ? 'opacity-100 translate-y-0 scale-100' : '',
                      // Transitions
                      'transition-all duration-700 ease-out will-change-transform transform-gpu',
                      // Hover/press interactions
                      'hover:-translate-y-1 hover:bg-black/[0.12] dark:hover:bg-white/[0.12] hover:border-black/[0.16] dark:hover:border-white/[0.16] active:translate-y-0',
                      'shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]',
                    ].join(' ')}
                    style={{ transitionDelay: `${index * 0.15}s` }}
                  >
                    {/* Glow overlay */}
                    <div 
                      className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" 
                      style={{ background: 'radial-gradient(120px 120px at 50% 20%, rgba(255,255,255,0.07), rgba(255,255,255,0))' }} 
                    />
                    
                    {/* Step Number - large background number */}
                    <div className="relative mb-4 w-full flex justify-center">
                      <div className="font-bold text-black/[0.12] dark:text-white/[0.12] text-[80px] lg:text-[100px] leading-none tracking-tight"
                           style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Step Title */}
                    <h3 className="font-bold text-black dark:text-white text-[20px] lg:text-[24px] leading-tight max-w-[280px] relative z-10"
                        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                      {step.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Arrows between steps - positioned in the gaps, hidden on mobile */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-20">
            {steps.slice(0, -1).map((_, index) => {
              // Position arrows at 33.33% and 66.66% (between columns)
              const positions = ['left-[33.333%]', 'left-[66.666%]'];
              
              return (
                <div 
                  key={index}
                  className={`absolute top-1/2 ${positions[index]} -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/[0.08] dark:bg-white/[0.08] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-black/60 dark:text-white/60" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;


