import { Star, Phone, MessageCircle, ArrowRight, MapPin } from "lucide-react";
import { BUSINESS, HERO_IMAGE } from "@/lib/constants";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-neutral-950"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-neutral-950/65" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-[100svh] flex flex-col justify-end">
        {/* Top meta line */}
        <div className="flex flex-wrap items-center gap-4 mb-10 lg:mb-16">
          <div
            data-testid="hero-rating-badge"
            className="flex items-center gap-2 border border-yellow-400/60 px-4 py-2"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" strokeWidth={1.5} />
            <span className="font-body text-xs uppercase tracking-widest text-yellow-400 font-semibold">
              {BUSINESS.rating} / 5 · {BUSINESS.reviewsCount} Reviews
            </span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            <span className="font-body text-xs uppercase tracking-widest">
              Naledi, Soweto · ZA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="font-body text-xs lg:text-sm uppercase tracking-[0.3em] text-yellow-400 mb-4">
              Construction · Home Improvement · Soweto
            </p>
            <h1
              data-testid="hero-heading"
              className="font-display font-black uppercase text-white leading-[0.92] tracking-tighter text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Built right.
              <br />
              <span className="text-yellow-400">From the ground up.</span>
            </h1>
            <p className="mt-8 font-body text-base lg:text-lg text-neutral-300 max-w-xl leading-relaxed">
              {BUSINESS.name} delivers reliable, affordable and high-quality
              workmanship across construction, electrical, flooring, paving and
              full home renovations.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#quote"
                data-testid="hero-quote-btn"
                className="group inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-body font-bold text-sm uppercase tracking-widest px-8 py-5 transition-colors"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-3 border border-white/40 hover:border-white text-white font-body font-bold text-sm uppercase tracking-widest px-8 py-5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="hero-call-btn"
                className="inline-flex items-center justify-center gap-3 text-white hover:text-yellow-400 font-body font-bold text-sm uppercase tracking-widest px-2 py-5 transition-colors"
              >
                <Phone className="w-4 h-4" /> {BUSINESS.phone}
              </a>
            </div>
          </div>

          {/* Right meta block */}
          <div
            data-testid="hero-meta-block"
            className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-white/15"
          >
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-display text-5xl lg:text-6xl font-black text-white tracking-tighter">
                  17
                </div>
                <div className="font-body text-xs uppercase tracking-[0.25em] text-neutral-400 mt-1">
                  Specialist services
                </div>
              </div>
              <div>
                <div className="font-display text-5xl lg:text-6xl font-black text-white tracking-tighter">
                  4.6<span className="text-yellow-400">★</span>
                </div>
                <div className="font-body text-xs uppercase tracking-[0.25em] text-neutral-400 mt-1">
                  Average rating · 18 reviews
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="font-body text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">
                  Visit us
                </div>
                <div className="font-body text-sm text-white">
                  {BUSINESS.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
