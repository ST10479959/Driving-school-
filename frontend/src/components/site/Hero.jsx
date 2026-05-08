import { Phone, MessageCircle, ArrowRight, MapPin, Star } from "lucide-react";
import { BUSINESS, HERO_IMAGE } from "@/lib/constants";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative bg-[#fafafa] pt-28 lg:pt-36 pb-20 lg:pb-32 overflow-hidden"
    >
      {/* Decorative road line */}
      <div className="absolute top-24 left-0 right-0 road-line opacity-15" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-7">
            <div
              data-testid="hero-eyebrow"
              className="inline-flex items-center gap-2 bg-[#7dd3fc] border-2 border-[#0a0a0a] px-4 py-2 shadow-brutal-sm mb-6"
            >
              <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="font-body text-[11px] uppercase tracking-[0.25em] font-bold text-[#0a0a0a]">
                Florida · Roodepoort · Gauteng
              </span>
            </div>

            <h1
              data-testid="hero-heading"
              className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.92]"
            >
              Learn to drive
              <br />
              <span className="bg-[#7dd3fc] px-3 inline-block border-2 border-[#0a0a0a] -rotate-1 my-1">
                with patience.
              </span>
              <br />
              Pass with pride.
            </h1>

            <p className="mt-8 font-body text-lg lg:text-xl text-[#4a4a4a] max-w-xl leading-relaxed">
              {BUSINESS.name} offers patient, professional one-on-one driving
              lessons in dual-controlled vehicles. From learner's licence theory
              to test day — we'll get you there.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                data-testid="hero-book-btn"
                className="group inline-flex items-center justify-center gap-3 bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-8 py-5 border-2 border-[#0a0a0a] shadow-brutal hover-lift transition-all"
              >
                Book Your First Lesson
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-8 py-5 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>

            <a
              href={`tel:${BUSINESS.phoneTel}`}
              data-testid="hero-call-btn"
              className="mt-6 inline-flex items-center gap-2 font-body text-sm font-bold text-[#0a0a0a] hover:text-[#0a0a0a]/60 underline underline-offset-4 decoration-[#7dd3fc] decoration-[3px]"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} /> Or call {BUSINESS.phone}
            </a>
          </div>

          {/* Image card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Yellow back card */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#7dd3fc] border-2 border-[#0a0a0a]" aria-hidden="true" />
              {/* Image */}
              <div className="relative bg-white border-2 border-[#0a0a0a] overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Ray Driving School branded vehicle"
                  className="w-full h-[420px] sm:h-[500px] lg:h-[560px] object-cover"
                  style={{ objectPosition: "75% 22%" }}
                />
              </div>
              {/* Floating badge */}
              <div
                data-testid="hero-badge"
                className="absolute -bottom-6 -left-6 sm:-left-10 bg-white border-2 border-[#0a0a0a] shadow-brutal-sm p-4 sm:p-5 max-w-[220px]"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#7dd3fc] text-[#7dd3fc]" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="font-display font-bold text-sm text-[#0a0a0a] leading-tight">
                  "Patient, professional & got me through first time."
                </p>
                <p className="font-body text-[10px] uppercase tracking-widest text-[#4a4a4a] mt-2 font-bold">
                  — Nomvula T.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
