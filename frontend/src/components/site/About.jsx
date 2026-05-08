import { CheckCircle2 } from "lucide-react";
import { LESSON_IMAGE, STATS } from "@/lib/constants";

const POINTS = [
  "Patient, friendly instructors who actually listen",
  "Calm, structured progression — never rushed",
  "Vehicle pickup arranged from local meeting points",
  "Mock tests on the actual K53 yard layouts",
  "Honest feedback after every single lesson",
];

export const About = () => {
  return (
    <section id="why" data-testid="about-section" className="bg-white border-y-2 border-[#0a0a0a] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 -translate-x-3 -translate-y-3 bg-[#7dd3fc] border-2 border-[#0a0a0a]" aria-hidden="true" />
              <div className="relative border-2 border-[#0a0a0a] overflow-hidden bg-white">
                <img
                  src={LESSON_IMAGE}
                  alt="Driving lesson in progress"
                  className="w-full h-[420px] lg:h-[500px] object-cover"
                />
              </div>
              {/* Stat plate */}
              <div className="absolute -right-4 sm:-right-6 -bottom-6 bg-[#0a0a0a] text-white border-2 border-[#0a0a0a] shadow-brutal-sm p-5 max-w-[200px]">
                <div className="font-display font-black text-3xl text-[#7dd3fc] leading-none">
                  100%
                </div>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] font-bold mt-2">
                  One-on-one focus
                </p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#0a0a0a] mb-4">
              / Why Ray Driving School
            </p>
            <h2
              data-testid="about-heading"
              className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Friendly. Affordable.
              <br />
              <span className="bg-[#7dd3fc] border-2 border-[#0a0a0a] px-3 inline-block">
                Truly customer-focused.
              </span>
            </h2>
            <div className="mt-8 space-y-4 font-body text-base lg:text-lg text-[#4a4a4a] leading-relaxed">
              <p>
                Ray Driving School is rooted in Florida, Roodepoort. We treat
                every student like a neighbour — because most of you are. That
                means honest pricing, real time spent behind the wheel, and an
                instructor who genuinely wants you to pass.
              </p>
              <p>
                Our cars are fitted with dual controls, so even your very first
                lesson is safe. And because we know the local test centres
                inside out, we'll prepare you on the exact yard and routes
                you'll see on the day.
              </p>
            </div>

            <ul className="mt-10 space-y-3" data-testid="about-points">
              {POINTS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm font-medium text-[#0a0a0a]">
                  <CheckCircle2 className="w-5 h-5 text-[#7dd3fc] flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div data-testid="stats-grid" className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="bg-[#fafafa] border-2 border-[#0a0a0a] p-4">
                  <div className="font-display text-2xl lg:text-3xl font-black text-[#0a0a0a] tracking-tight leading-none">
                    {s.value}
                  </div>
                  <div className="font-body text-[10px] uppercase tracking-[0.2em] font-bold text-[#4a4a4a] mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
