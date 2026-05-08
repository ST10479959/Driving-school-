import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export const Testimonials = () => {
  return (
    <section data-testid="testimonials-section" className="py-24 lg:py-32 bg-white border-y-2 border-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#0a0a0a] mb-4">
            / Student stories
          </p>
          <h2
            data-testid="testimonials-heading"
            className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
          >
            Real learners.
            <br />
            <span className="bg-[#7dd3fc] border-2 border-[#0a0a0a] px-3 inline-block">
              Real licences.
            </span>
          </h2>
        </div>

        <div data-testid="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              data-testid={`testimonial-card-${i}`}
              className="bg-[#fafafa] border-2 border-[#0a0a0a] shadow-brutal-sm p-7 lg:p-8 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < t.rating ? "text-[#7dd3fc] fill-[#7dd3fc]" : "text-[#0a0a0a]/20"
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="font-display text-lg lg:text-xl font-medium text-[#0a0a0a] leading-snug">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="mt-8 pt-5 border-t-2 border-[#0a0a0a]/15 flex items-center justify-between">
                <span className="font-body font-bold text-sm text-[#0a0a0a]">
                  {t.name}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/60 bg-[#7dd3fc]/40 px-2 py-1 border border-[#0a0a0a]">
                  {t.achievement}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
