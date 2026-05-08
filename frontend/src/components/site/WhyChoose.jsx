import { WHY_CHOOSE } from "@/lib/constants";

export const WhyChoose = () => {
  return (
    <section data-testid="why-choose-section" className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#0a0a0a] mb-4">
            / Six reasons learners stay
          </p>
          <h2
            data-testid="why-choose-heading"
            className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
          >
            We're built around
            <br />
            <span className="bg-[#7dd3fc] border-2 border-[#0a0a0a] px-3 inline-block">
              one student at a time.
            </span>
          </h2>
        </div>

        <div data-testid="why-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {WHY_CHOOSE.map((w, i) => {
            const Icon = w.icon;
            return (
              <div
                key={i}
                data-testid={`why-card-${i}`}
                className="bg-white border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all p-6 lg:p-7"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#7dd3fc] border-2 border-[#0a0a0a]">
                  <Icon className="w-6 h-6 text-[#0a0a0a]" strokeWidth={2.5} />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-[#0a0a0a] tracking-tight leading-tight">
                  {w.title}
                </h3>
                <p className="mt-3 font-body text-sm text-[#4a4a4a] leading-relaxed">
                  {w.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
