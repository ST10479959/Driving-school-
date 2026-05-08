import { CheckCircle2 } from "lucide-react";
import { STATS } from "@/lib/constants";

const POINTS = [
  "Local Soweto-based team — fast on-site response.",
  "Transparent quotes with no hidden fees.",
  "Certified electrical and structural workmanship.",
  "Materials sourced from trusted SA suppliers.",
  "Project timelines respected — week-by-week updates.",
];

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="bg-white py-24 lg:py-32 border-y border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
              / 02 — About
            </p>
            <h2
              data-testid="about-heading"
              className="font-display font-black uppercase text-neutral-950 tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Built in Naledi.
              <br />
              Trusted across Soweto.
            </h2>

            <div className="mt-8 space-y-5 font-body text-base lg:text-lg text-neutral-600 leading-relaxed">
              <p>
                MVELO TRADING ENTERPRISE is a construction and home-improvement
                company rooted in Naledi, Soweto. We bring together skilled
                builders, electricians, painters and designers under one roof —
                so every project is handled by a single accountable team.
              </p>
              <p>
                Whether it&rsquo;s a tile repair, a full house renovation, or a
                new build from architectural plan to handover, we work with the
                same code: do it right, do it once, and do it for a fair price.
              </p>
            </div>

            <ul className="mt-10 space-y-3" data-testid="about-points">
              {POINTS.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-body text-sm text-neutral-800"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats block */}
          <div className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-neutral-200">
            <div
              data-testid="stats-grid"
              className="grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200"
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-8 lg:p-12 flex flex-col justify-between min-h-[180px]"
                >
                  <span className="font-body text-xs uppercase tracking-widest text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-display text-5xl lg:text-7xl font-black text-neutral-950 tracking-tighter">
                      {s.value}
                    </div>
                    <div className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promise card */}
            <div className="mt-px bg-neutral-950 p-8 lg:p-12">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-yellow-400 mb-3">
                Our Promise
              </p>
              <p className="font-display text-2xl lg:text-3xl font-bold text-white leading-snug tracking-tight">
                &ldquo;If it carries our name, it carries our standard.
                Reliable. Affordable. High-quality workmanship — every single
                time.&rdquo;
              </p>
              <p className="mt-6 font-body text-xs uppercase tracking-widest text-neutral-400">
                — The MVELO Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
