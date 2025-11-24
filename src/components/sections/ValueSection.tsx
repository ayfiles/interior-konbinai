const ValueSection = () => {
  const cards = [
    {
      number: "01",
      problem: "Production Takes Too Long",
      problemDesc:
        "Shoots take weeks to plan, capture, and edit — by the time they're ready, trends have passed.",
      solution: "Campaigns Delivered in Days",
      solutionDesc:
        "We move as fast as culture — delivering launch-ready visuals within days, not months.",
    },
    {
      number: "02",
      problem: "High Costs, Limited Output",
      problemDesc:
        "Traditional production drains budgets and limits content.",
      solution: "Smarter Systems, Greater Scale",
      solutionDesc:
        "AI workflows cut costs and multiply creative output — more visuals, same spend.",
    },
    {
      number: "03",
      problem: "Inconsistent Visuals",
      problemDesc:
        "Each shoot changes tone, breaking brand identity.",
      solution: "Consistency by Design",
      solutionDesc:
        "We build repeatable visual systems that maintain tone, story, and quality across every campaign.",
    },
    {
      number: "04",
      problem: "Creative Bottlenecks",
      problemDesc:
        "Traditional schedules delay launches and momentum.",
      solution: "Creative Freedom, Delivered Fast",
      solutionDesc:
        "We give your brand creative independence — ready-to-launch visuals whenever you need them.",
    },
  ];

  return (
    <section className="bg-[#F2F0EF] dark:bg-charcoal py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Intro */}
        <div className="text-center mb-20 lg:mb-28 max-w-[720px] mx-auto space-y-4">
          <h2 className="font-display font-bold text-black dark:text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight">
            Traditional content is holding brands back.
          </h2>
          <p className="font-body text-black/85 dark:text-white/85 text-[18px] lg:text-[20px] leading-relaxed">
            Our solutions blend creativity and speed so your brand never misses a moment.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-20 lg:space-y-24">
          {cards.map((card, index) => (
            <div
              key={card.number}
              className="bg-[#F2F0EF]/40 dark:bg-black/40 rounded-[28px] p-8 lg:p-12 relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Number Background */}
              <div className="absolute top-8 left-8 lg:top-12 lg:left-12 font-display font-bold text-[64px] lg:text-[80px] text-black/[0.08] dark:text-white/[0.08] leading-none">
                {card.number}
              </div>

              {/* Content */}
              <div className="relative space-y-8 pt-16 lg:pt-20">
                {/* Problem */}
                <div className="space-y-3">
                  <p className="font-body font-medium text-[14px] lg:text-[15px] text-black/70 dark:text-white/70 uppercase tracking-wider">
                    THE PROBLEM
                  </p>
                  <h3 className="font-display font-bold text-black dark:text-white text-[26px] lg:text-[32px]">
                    {card.problem}
                  </h3>
                  <p className="font-body text-black/80 dark:text-white/80 text-[17px] lg:text-[18px] max-w-[800px]">
                    {card.problemDesc}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-black/[0.08] dark:bg-white/[0.08] max-w-full" />

                {/* Solution */}
                <div className="space-y-3">
                  <p className="font-body font-medium text-[14px] lg:text-[15px] text-black/70 dark:text-white/70 uppercase tracking-wider">
                    OUR SOLUTION
                  </p>
                  <h3 className="font-display font-semibold italic text-black dark:text-white text-[24px] lg:text-[30px]">
                    {card.solution}
                  </h3>
                  <p className="font-body italic text-black/85 dark:text-white/85 text-[17px] lg:text-[18px] max-w-[800px]">
                    {card.solutionDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
