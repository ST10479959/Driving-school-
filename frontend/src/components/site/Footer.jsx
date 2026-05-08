import { BUSINESS, SERVICES } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#0a0a0a] text-white border-t-4 border-[#FFD600]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-[#FFD600] border-2 border-[#FFD600] flex items-center justify-center">
                <span className="font-display font-black text-[#0a0a0a] text-lg leading-none">
                  R
                </span>
              </div>
              <div className="font-display font-black uppercase tracking-tight text-xl">
                Ray <span className="text-[#FFD600]">Driving School</span>
              </div>
            </div>
            <p className="font-body text-sm text-white/70 max-w-sm leading-relaxed">
              {BUSINESS.tagline} A friendly, customer-focused driving school
              based in Florida, Roodepoort.
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-body text-xs uppercase tracking-[0.25em] font-bold text-[#FFD600] mb-5">
              Lessons
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-sm font-body">
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <a
                    href="#services"
                    data-testid={`footer-service-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-white/80 hover:text-[#FFD600] transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-body text-xs uppercase tracking-[0.25em] font-bold text-[#FFD600] mb-5">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm text-white/80">
              <li>
                <a href={`tel:${BUSINESS.phoneTel}`} data-testid="footer-phone" className="hover:text-[#FFD600] transition-colors">
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp"
                  className="hover:text-[#FFD600] transition-colors"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="text-white/70 leading-relaxed">{BUSINESS.address}</li>
              <li className="text-white/50 text-xs uppercase tracking-widest">
                Mon — Fri · 08:00–17:00
                <br />
                Sat · 08:30–14:00
              </li>
            </ul>
          </div>
        </div>

        {/* Big mark */}
        <div className="mt-16 pt-10 border-t-2 border-white/10">
          <h2 className="font-display font-black uppercase tracking-tighter text-5xl sm:text-7xl lg:text-[140px] leading-[0.85] text-white/5 select-none">
            Ray Driving School
          </h2>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">
            Florida · Roodepoort · Gauteng
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
