import { Star } from "lucide-react";
import { TESTIMONIALS, BUSINESS } from "@/lib/constants";

export const Reviews = () => {
  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="bg-white py-24 lg:py-32 border-y border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-5">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
              / 04 — Reviews
            </p>
            <h2
              data-testid="reviews-heading"
              className="font-display font-black uppercase text-neutral-950 tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              {BUSINESS.rating}
              <span className="text-yellow-400">★</span>
              <br />
              from {BUSINESS.reviewsCount} clients.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <div className="border-l-4 border-yellow-400 pl-6">
              <p className="font-body text-base lg:text-lg text-neutral-700 leading-relaxed">
                Real feedback from neighbours and homeowners across Soweto.
                Honesty, on-time delivery and clean finishing — these are the
                things our clients keep mentioning.
              </p>
            </div>
          </div>
        </div>

        <div
          data-testid="reviews-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              data-testid={`review-card-${i}`}
              className="bg-white p-8 lg:p-10 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="flex items-center gap-1 mb-5" aria-label={`${t.rating} stars`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < t.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-neutral-300"
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="font-display text-xl lg:text-2xl font-medium text-neutral-950 leading-snug tracking-tight">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-5">
                <div>
                  <div className="font-body font-bold text-sm text-neutral-950">
                    {t.name}
                  </div>
                  <div className="font-body text-xs text-neutral-500">
                    {t.location}
                  </div>
                </div>
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 border border-neutral-200 px-2.5 py-1.5">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
