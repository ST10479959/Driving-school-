import { Clock, Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const Hours = () => {
  return (
    <section id="hours" data-testid="hours-section" className="bg-[#0a0a0a] text-white py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative dashes */}
      <div className="absolute top-12 left-0 right-0 road-line opacity-30" aria-hidden="true" style={{ filter: "invert(1)" }} />
      <div className="absolute bottom-12 left-0 right-0 road-line opacity-30" aria-hidden="true" style={{ filter: "invert(1)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#7dd3fc] mb-4">
              / Open six days a week
            </p>
            <h2
              data-testid="hours-heading"
              className="font-display font-black uppercase tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-white"
            >
              Lessons that
              <br />
              <span className="text-[#7dd3fc]">fit your week.</span>
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg text-white/70 leading-relaxed max-w-md">
              Weekday slots before and after work, plus Saturday mornings.
              Reach out and we'll find a time that works for you.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="hours-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#7dd3fc] text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-6 py-4 border-2 border-[#7dd3fc] hover:bg-white hover:border-white transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={2.5} /> {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hours-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-body font-bold text-sm uppercase tracking-widest px-6 py-4 transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={2.5} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white text-[#0a0a0a] border-2 border-[#7dd3fc] shadow-[8px_8px_0_0_rgba(125,211,252,1)] p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#7dd3fc] border-2 border-[#0a0a0a] flex items-center justify-center">
                  <Clock className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <p className="font-body text-xs uppercase tracking-[0.25em] font-bold">
                  Operating Hours
                </p>
              </div>

              <ul data-testid="hours-list" className="divide-y-2 divide-[#0a0a0a]">
                {BUSINESS.hours.map((h, i) => (
                  <li
                    key={i}
                    data-testid={`hours-row-${i}`}
                    className="flex items-center justify-between py-4 lg:py-5"
                  >
                    <span className="font-display font-bold text-lg lg:text-xl uppercase tracking-tight">
                      {h.day}
                    </span>
                    <span
                      className={`font-display font-black text-lg lg:text-2xl tracking-tight ${
                        h.open === "Closed" ? "text-[#0a0a0a]/40" : "text-[#0a0a0a]"
                      }`}
                    >
                      {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-[#7dd3fc] border-2 border-[#0a0a0a] p-4 flex items-start gap-3">
                <span className="font-display font-black text-2xl leading-none">!</span>
                <p className="font-body text-sm font-semibold text-[#0a0a0a]">
                  Weekday and Saturday slots fill up fast — book at least a
                  week ahead for your preferred time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hours;
