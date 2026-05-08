import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

export const Services = () => {
  return (
    <section id="services" data-testid="services-section" className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-6">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#0a0a0a] font-bold mb-4">
              / What we teach
            </p>
            <h2
              data-testid="services-heading"
              className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              From your first
              <br />
              <span className="bg-[#FFD600] border-2 border-[#0a0a0a] px-3 inline-block">
                K53 page
              </span>
              <br />
              to your test pass.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="font-body text-base lg:text-lg text-[#4a4a4a] leading-relaxed">
              Whether you've never sat behind a wheel or you're polishing the
              final test routes, we have a lesson plan for you. Manual or
              automatic. Code 8 or learner's. Always one-on-one.
            </p>
          </div>
        </div>

        {/* Bento grid - 2 featured large + smaller cards */}
        <div data-testid="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            const featured = s.featured;
            return (
              <a
                key={s.name}
                href="#book"
                data-testid={`service-card-${idx}`}
                className={`group relative border-2 border-[#0a0a0a] shadow-brutal hover-lift transition-all p-7 lg:p-8 flex flex-col justify-between ${
                  featured
                    ? "bg-[#FFD600] md:col-span-2 lg:col-span-1 lg:row-span-1 min-h-[260px]"
                    : "bg-white min-h-[220px]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 flex items-center justify-center border-2 border-[#0a0a0a] ${
                      featured ? "bg-white" : "bg-[#FFD600]"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#0a0a0a]" strokeWidth={2.5} />
                  </div>
                  <span className="font-display font-black text-xs text-[#0a0a0a]/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6">
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/70 mb-2">
                    {s.short}
                  </p>
                  <h3
                    className={`font-display font-bold text-[#0a0a0a] tracking-tight leading-tight ${
                      featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
                    }`}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-3 font-body text-sm text-[#0a0a0a]/75 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1 font-body text-[11px] uppercase tracking-widest font-bold text-[#0a0a0a]">
                    Book This Lesson
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
