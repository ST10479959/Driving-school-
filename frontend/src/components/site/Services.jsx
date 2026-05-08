import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

export const Services = () => {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="bg-neutral-50 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-5">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
              / 01 — Services
            </p>
            <h2
              data-testid="services-heading"
              className="font-display font-black uppercase text-neutral-950 tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Seventeen ways
              <br />
              we build & fix.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="font-body text-base lg:text-lg text-neutral-600 leading-relaxed">
              From a single TV mount to a full house build — every project is
              delivered with the same standard of reliable, affordable and
              high-quality workmanship.
            </p>
          </div>
        </div>

        {/* Grid borders technique */}
        <div
          data-testid="services-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200"
        >
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href="#quote"
                data-testid={`service-card-${idx}`}
                className="group relative bg-white p-6 lg:p-8 hover:bg-neutral-950 transition-colors duration-300 flex flex-col justify-between min-h-[180px] lg:min-h-[220px]"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 flex items-center justify-center border border-neutral-200 group-hover:border-yellow-400 group-hover:bg-yellow-400 transition-colors">
                    <Icon
                      className="w-5 h-5 text-neutral-950 group-hover:text-neutral-950"
                      strokeWidth={2}
                    />
                  </div>
                  <span className="font-display text-xs font-bold text-neutral-300 group-hover:text-yellow-400 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-neutral-950 group-hover:text-white text-lg lg:text-xl leading-tight tracking-tight transition-colors">
                    {s.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-neutral-500 group-hover:text-neutral-300 leading-relaxed transition-colors line-clamp-2">
                    {s.desc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 font-body text-[11px] uppercase tracking-widest font-bold text-neutral-400 group-hover:text-yellow-400 transition-colors">
                    Get Quote
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
          {/* Filler cell to keep grid neat at 4 cols (17 % 4 = 1; need 3 fillers on xl) */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`filler-${i}`}
              aria-hidden="true"
              className="hidden xl:flex bg-white p-8 items-end"
            >
              <span className="font-display text-xs uppercase tracking-widest text-neutral-300">
                {i === 2 ? "+ More on request" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
