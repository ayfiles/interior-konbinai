import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import seoulLoft1 from "@/assets/Seoul Loft Industrial 1.png";
import seoulLoft2 from "@/assets/Seoul Loft Industrial 2.png";
import seoulLoft3 from "@/assets/Seoul Loft Industrial 3.png";
import seoulLoft4 from "@/assets/Seoul Loft Industrial 4.png";
import wienJapandi1 from "@/assets/wien japandi 1.png";
import wienJapandi2 from "@/assets/wien japandi 2.png";
import wienJapandi3 from "@/assets/wien japandi 3.png";
import wienJapandi4 from "@/assets/wien japandi 4.png";
import ikeaOffwhite1 from "@/assets/ikea x offwhite 1.png";
import ikeaOffwhite2 from "@/assets/ikea x offwhite 2.png";
import ikeaOffwhite3 from "@/assets/ikea x offwhite 3.png";
import ikeaOffwhite4 from "@/assets/ikea x offwhite 4.webp";
import ikeaModular1 from "@/assets/ikea modular life 1.png";
import ikeaModular2 from "@/assets/ikea modular life 2.png";
import ikeaModular3 from "@/assets/ikea modular life 3.png";
import ikeaModular4 from "@/assets/ikea modular life 4.png";
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [imageLightboxOpen, setImageLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { currentLang } = useLanguage();

  // List of projects
  const projects = [
    {
      name: "Seoul Loft — Industrial Sanctuary",
      thumbnail: seoulLoft1,
      images: [seoulLoft1, seoulLoft2, seoulLoft3, seoulLoft4],
    },
    {
      name: "IKEA x Off-White",
      thumbnail: ikeaOffwhite1,
      images: [ikeaOffwhite1, ikeaOffwhite2, ikeaOffwhite3, ikeaOffwhite4],
    },
    {
      name: "Vienna goes Japandi",
      thumbnail: wienJapandi3,
      images: [wienJapandi1, wienJapandi2, wienJapandi3, wienJapandi4],
    },
    {
      name: "IKEA Student Micro Studio",
      thumbnail: ikeaModular1,
      images: [ikeaModular1, ikeaModular2, ikeaModular3, ikeaModular4],
    },
  ];

  // Build projectRows
  const projectRows: typeof projects[][] = [];
  for (let i = 0; i < projects.length; i += 3) {
    projectRows.push(projects.slice(i, i + 3));
  }

  // Row-based reveal on scroll
  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".js-row-reveal"));
    if (!rows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("animate-fade-up", "opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(el);
          }
        });
      },
      {rootMargin: "0px 0px -10% 0px", threshold: 0.15}
    );
    rows.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openLightbox = (projectName: string) => {
    setSelectedProject(projectName);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const selectedProjectData = projects.find((p) => p.name === selectedProject);

  const selectedImages = selectedProjectData?.images || [];

  const openImageLightbox = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setImageLightboxOpen(true);
  };

  const closeImageLightbox = () => {
    setImageLightboxOpen(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : selectedImages.length - 1));
    } else {
      setSelectedImageIndex((prev) => (prev < selectedImages.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation for image lightbox
  useEffect(() => {
    if (!imageLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : selectedImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev < selectedImages.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        setImageLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageLightboxOpen, selectedImages.length]);

  return (
    <>
      <section id="campaign-gallery" className="relative -mt-16 lg:-mt-24 bg-[#F2F0EF] dark:bg-black py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
        {/* Top gradient to smooth transition from hero into gallery */}
        <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 lg:-top-16 lg:h-16 bg-gradient-to-b from-transparent to-[#F2F0EF] dark:to-black z-10" />
        
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
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Title */}
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="font-bold text-black dark:text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              {texts[currentLang].gallery_title}
            </h2>
            <p className="font-body text-black/70 dark:text-white/70 text-[18px] lg:text-[20px] mt-4 max-w-[600px] mx-auto">
              {texts[currentLang].gallery_subtitle}
            </p>
          </div>

          {/* Carousel for desktop/ipad */}
          {projects.length > 0 && (
            <div className="hidden md:block group w-full relative overflow-x-hidden select-none pb-8">
              <div className="flex w-max gap-8 animate-infinite-carousel group-hover:[animation-play-state:paused]">
                {[...projects, ...projects].map((project, idx) => (
                  <button
                    key={project.name + '-' + idx}
                    onClick={() => openLightbox(project.name)}
                    className="relative aspect-[4/5] rounded-[24px] overflow-hidden cursor-pointer"
                    style={{ width: '280px', minWidth: '280px', maxWidth: '320px' }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover duration-700 transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F2F0EF]/60 dark:from-black/60 via-[#F2F0EF]/10 dark:via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="font-body font-medium text-black dark:text-white text-[15px] tracking-wide">
                        {project.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile: swipe carousel */}
          <MobileProjectsCarousel projects={projects} onOpen={openLightbox} />
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-[#F2F0EF]/80 dark:bg-black/80 flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={closeLightbox}>
          <div className="relative w-full max-w-[1470px] md:max-w-[1290px] lg:max-w-[1470px] max-h-[95vh] rounded-3xl bg-black/8 dark:bg-white/12 border border-black/15 dark:border-white/20 backdrop-blur-frosted shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                {/* Images Grid (4x2) - Top */}
                <div className="w-full">
                  <div className="overflow-y-auto hide-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedImages.map((img, index) => (
                        <div 
                          key={index} 
                          className="rounded-[18px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity aspect-square"
                          onClick={() => openImageLightbox(index)}
                        >
                          <img
                            src={img}
                            alt={`${selectedProject} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {selectedProjectData?.video && (
                        <div className="col-span-2 md:col-span-4 rounded-[18px] overflow-hidden">
                          <video
                            src={selectedProjectData.video}
                            className="w-full h-full object-cover"
                            playsInline
                            controls
                            loop
                            muted
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Card - Bottom */}
                <div className="w-full">
                  <div className="rounded-2xl bg-black/8 dark:bg-white/10 border border-black/15 dark:border-white/20 backdrop-blur-frosted shadow-xl p-5 md:p-6 max-h-[40vh] overflow-y-auto hide-scrollbar">
                    <h3 className="text-black dark:text-white font-bold text-xl md:text-2xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      {selectedProject || 'Project Title'}
                    </h3>
                    <div className="text-black/70 dark:text-white/70 text-sm mt-2">
                      {/* Date + timeframe from translations if available */}
                      <p>
                        {(selectedProject && texts[currentLang].project_info[selectedProject]?.date) || 'Januar 2024'}
                      </p>
                      <p className="mt-1">
                        {(selectedProject && texts[currentLang].project_info[selectedProject]?.timeframe) ||
                          (currentLang === 'DE' ? 'Zeitraum: 2 Wochen' : 'Timeframe: 2 weeks')}
                      </p>
                    </div>
                    <p className="text-black/85 dark:text-white/85 text-sm md:text-base leading-relaxed mt-4">
                      {(selectedProject && texts[currentLang].project_info[selectedProject]?.description) ||
                        (currentLang === 'DE'
                          ? 'Beispielbeschreibung: Konzeption, Produktion und Postproduktion für eine visuelle Kampagne. Fokus auf Markenästhetik und Emotion.'
                          : 'Sample description: Concept, production, and post-production for a visual campaign. Focused on brand aesthetics and emotion.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox - Fullscreen image viewer */}
      {imageLightboxOpen && selectedImages[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeImageLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeImageLightbox}
            className="absolute top-4 right-4 text-white hover:text-white/80 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            aria-label="Close image lightbox"
          >
            <X size={28} />
          </button>

          {/* Previous button */}
          {selectedImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft size={32} />
            </button>
          )}

          {/* Next button */}
          {selectedImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ArrowRight size={32} />
            </button>
          )}

          {/* Image counter */}
          {selectedImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm z-10 bg-black/50 px-4 py-2 rounded-full">
              {selectedImageIndex + 1} / {selectedImages.length}
            </div>
          )}

          {/* Fullscreen image */}
          <div 
            className="max-w-[95vw] max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImages[selectedImageIndex]}
              alt={`${selectedProject} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[95vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

type MobileProjectsCarouselProps = {
  projects: { name: string; thumbnail: string }[];
  onOpen: (name: string) => void;
};

const MobileProjectsCarousel = ({ projects, onOpen }: MobileProjectsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  } as any);

  // Simple autoplay: advance every few seconds, pause on interaction
  useEffect(() => {
    if (!emblaApi) return;
    let timer: number | undefined;
    let paused = false;

    const play = () => {
      if (paused) return;
      stop();
      timer = window.setInterval(() => {
        if (!emblaApi) return;
        if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        else emblaApi.scrollTo(0);
      }, 2800); // slow auto-advance
    };

    const stop = () => {
      if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    };

    const pause = () => {
      paused = true;
      stop();
    };

    const resume = () => {
      paused = false;
      play();
    };

    play();
    emblaApi.on('pointerDown', pause);
    emblaApi.on('pointerUp', () => setTimeout(resume, 1000));
    emblaApi.on('reInit', play);

    return () => {
      stop();
    };
  }, [emblaApi]);

  return (
    <div className="block md:hidden">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => {/* desktop hover pause noop on mobile */}}
      >
        <div className="flex gap-4 pl-1">
          {projects.map((project) => (
            <button
              key={project.name}
              onClick={() => onOpen(project.name)}
              className="relative aspect-[4/5] rounded-[24px] overflow-hidden flex-[0_0_86%] sm:flex-[0_0_70%]"
              onTouchStart={(e) => { /* pause handled via embla pointerDown */ }}
              onTouchEnd={(e) => { /* resume handled via embla pointerUp */ }}
            >
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F2F0EF]/80 dark:from-black/80 via-[#F2F0EF]/20 dark:via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-body font-medium text-black dark:text-white text-[13px] tracking-wide">
                  {project.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
