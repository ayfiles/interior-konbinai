import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RetainersSection = () => {
  const navigate = useNavigate();

  const retainers = [
    {
      title: "Essential",
      description:
        "Monthly visuals + creative direction for consistency.",
    },
    {
      title: "Growth",
      description:
        "Extended support for campaigns and multi-format content.",
    },
  ];

  return (
    <section className="bg-[#F2F0EF] dark:bg-black py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display font-bold text-black dark:text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight">
            Retainers.
          </h2>
          <p className="font-body text-black/85 dark:text-white/85 text-[18px] lg:text-[20px] max-w-[700px] mx-auto">
            Ongoing creative partnerships for consistent content and direction.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {retainers.map((retainer, index) => (
            <div
              key={retainer.title}
              className="border border-black/[0.08] dark:border-white/[0.08] rounded-[24px] p-8 lg:p-12 space-y-3 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="font-display font-bold text-black dark:text-white text-[28px] lg:text-[32px]">
                {retainer.title}
              </h3>
              <p className="font-body text-black/85 dark:text-white/85 text-[17px] lg:text-[18px]">
                {retainer.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Button
            onClick={() => navigate("/project-inquiry")}
            size="lg"
            className="rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] px-10 transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
          >
            Enquire About Retainers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RetainersSection;
