import { Phone, MessageCircle, MapPin, Mail, Clock, ArrowUpRight } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const Contact = () => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-neutral-950 text-white py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-yellow-400 mb-4">
              / 06 — Contact
            </p>
            <h2
              data-testid="contact-heading"
              className="font-display font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] text-white"
            >
              Let&rsquo;s build
              <br />
              <span className="text-yellow-400">something solid.</span>
            </h2>
            <p className="mt-8 font-body text-base lg:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Quotes are free. Site visits within Soweto are arranged on the
              same day where possible. Reach us by phone, WhatsApp, or come
              past the workshop.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="contact-call-btn"
                className="group flex items-center justify-between gap-4 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 px-6 py-5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" strokeWidth={2.25} />
                  <div>
                    <div className="font-body text-[10px] uppercase tracking-[0.25em] font-bold">
                      Call now
                    </div>
                    <div className="font-display font-black text-lg tracking-tight">
                      {BUSINESS.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-btn"
                className="group flex items-center justify-between gap-4 border border-white/20 hover:border-white text-white px-6 py-5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" strokeWidth={2.25} />
                  <div>
                    <div className="font-body text-[10px] uppercase tracking-[0.25em] font-bold text-yellow-400">
                      WhatsApp
                    </div>
                    <div className="font-display font-black text-lg tracking-tight">
                      Message us
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-white/10">
            <ul className="space-y-8">
              <ContactItem
                icon={MapPin}
                label="Location"
                primary={BUSINESS.address}
                testId="contact-location"
              />
              <ContactItem
                icon={Clock}
                label="Hours"
                primary="Mon — Sat · 07:00 to 18:00"
                secondary="Sundays by appointment"
                testId="contact-hours"
              />
              <ContactItem
                icon={Mail}
                label="Service Area"
                primary="All of Soweto & surrounding Johannesburg areas"
                testId="contact-area"
              />
            </ul>

            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
                Find us
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  BUSINESS.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-map-link"
                className="font-body text-sm text-yellow-400 hover:text-yellow-300 inline-flex items-center gap-2"
              >
                Open in Google Maps <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon: Icon, label, primary, secondary, testId }) => (
  <li className="flex items-start gap-4" data-testid={testId}>
    <div className="w-10 h-10 flex items-center justify-center border border-white/20 flex-shrink-0">
      <Icon className="w-4 h-4 text-yellow-400" strokeWidth={2} />
    </div>
    <div>
      <div className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-1">
        {label}
      </div>
      <div className="font-body text-base text-white leading-snug">{primary}</div>
      {secondary && (
        <div className="font-body text-sm text-neutral-400 mt-0.5">
          {secondary}
        </div>
      )}
    </div>
  </li>
);

export default Contact;
