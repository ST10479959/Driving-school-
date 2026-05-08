import { Phone, MessageCircle, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const Contact = () => {
  return (
    <section id="contact" data-testid="contact-section" className="bg-[#0a0a0a] text-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-12 left-0 right-0 road-line opacity-30" aria-hidden="true" style={{ filter: "invert(1)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#7dd3fc] mb-4">
              / Get in touch
            </p>
            <h2
              data-testid="contact-heading"
              className="font-display font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] text-white"
            >
              Ready to drive?
              <br />
              <span className="text-[#7dd3fc]">Let's start.</span>
            </h2>
            <p className="mt-8 font-body text-base lg:text-lg text-white/70 max-w-xl leading-relaxed">
              Same-day responses on calls and WhatsApp during operating hours.
              Drop in to the office, or book your first lesson online.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="contact-call-btn"
                className="group flex items-center justify-between gap-4 bg-[#7dd3fc] hover:bg-white text-[#0a0a0a] px-6 py-5 border-2 border-[#7dd3fc] hover:border-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" strokeWidth={2.5} />
                  <div>
                    <div className="font-body text-[10px] uppercase tracking-[0.25em] font-bold">
                      Call now
                    </div>
                    <div className="font-display font-black text-lg lg:text-xl tracking-tight">
                      {BUSINESS.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" strokeWidth={2.5} />
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-btn"
                className="group flex items-center justify-between gap-4 bg-white text-[#0a0a0a] px-6 py-5 border-2 border-white hover:bg-[#7dd3fc] hover:border-[#7dd3fc] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                  <div>
                    <div className="font-body text-[10px] uppercase tracking-[0.25em] font-bold">
                      WhatsApp
                    </div>
                    <div className="font-display font-black text-lg lg:text-xl tracking-tight">
                      Message us
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-12 lg:border-l-2 lg:border-white/15">
            <ul className="space-y-8">
              <ContactItem
                icon={MapPin}
                label="Visit Us"
                primary={BUSINESS.address}
                testId="contact-location"
              />
              <ContactItem
                icon={Clock}
                label="Hours"
                primary="Mon — Fri · 08:00 to 17:00"
                secondary={"Sat · 08:30 to 14:00 · Sun closed"}
                testId="contact-hours"
              />
              <ContactItem
                icon={Phone}
                label="Phone & WhatsApp"
                primary={BUSINESS.phone}
                testId="contact-phone-block"
              />
            </ul>

            <div className="mt-10 border-t-2 border-white/15 pt-8">
              <p className="font-body text-xs uppercase tracking-[0.25em] font-bold text-white/60 mb-3">
                Find us
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-map-link"
                className="inline-flex items-center gap-2 font-body text-sm text-[#7dd3fc] hover:text-white transition-colors font-bold"
              >
                Open in Google Maps <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div
          data-testid="contact-map-embed"
          className="mt-16 lg:mt-20 border-2 border-[#7dd3fc] shadow-[8px_8px_0_0_rgba(125,211,252,1)] overflow-hidden"
        >
          <iframe
            title="Ray Driving School location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&output=embed`}
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon: Icon, label, primary, secondary, testId }) => (
  <li className="flex items-start gap-4" data-testid={testId}>
    <div className="w-10 h-10 flex items-center justify-center bg-[#7dd3fc] border-2 border-[#7dd3fc] flex-shrink-0">
      <Icon className="w-4 h-4 text-[#0a0a0a]" strokeWidth={2.5} />
    </div>
    <div>
      <div className="font-body text-[10px] uppercase tracking-[0.25em] font-bold text-white/60 mb-1">
        {label}
      </div>
      <div className="font-body text-base text-white leading-snug">{primary}</div>
      {secondary && (
        <div className="font-body text-sm text-white/60 mt-0.5">{secondary}</div>
      )}
    </div>
  </li>
);

export default Contact;
