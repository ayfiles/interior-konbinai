import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";
import banner3 from "@/assets/banner-3.png";
import banner4 from "@/assets/banner-4.png";
import banner5 from "@/assets/banner-5.png";
import banner6 from "@/assets/banner-6.png";
import banner7 from "@/assets/banner-7.png";

const ImageBanner = () => {
  const images = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
  ];

  return (
    <section className="relative h-[35vh] lg:h-[40vh] overflow-hidden bg-[#F2F0EF] dark:bg-black">
      {/* Film grain overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />
      
      {/* Scrolling Images */}
      <div className="flex h-full gap-6 animate-slide-left">
        {/* First set */}
        {images.map((src, index) => (
          <div
            key={`first-${index}`}
            className="relative flex-shrink-0 h-full aspect-[3/4]"
          >
            <img
              src={src}
              alt={`Campaign visual ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((src, index) => (
          <div
            key={`second-${index}`}
            className="relative flex-shrink-0 h-full aspect-[3/4]"
          >
            <img
              src={src}
              alt={`Campaign visual duplicate ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageBanner;
