import { BUSINESS, SERVICES } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="bg-neutral-950 text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center">
                <span className="font-display font-black text-neutral-950 text-lg">
                  M
                </span>
              </div>
              <div className="font-display font-black uppercase tracking-tighter text-xl">
                {BUSINESS.shortName} <span className="text-neutral-500">Trading</span>
              </div>
            </div>
            <p className="font-body text-sm text-neutral-400 max-w-sm leading-relaxed">
              {BUSINESS.tagline} Building reputation one project at a time —
              right here in Naledi, Soweto.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="font-display font-black text-2xl text-white">
                4.6<span className="text-yellow-400">★</span>
              </span>
              <span className="font-body text-xs uppercase tracking-widest text-neutral-400">
                · 18 Reviews
              </span>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-body text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-5">
              Services
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-body">
              {SERVICES.slice(0, 10).map((s) => (
                <li key={s.name}>
                  <a
                    href="#services"
                    data-testid={`footer-service-${s.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-neutral-300 hover:text-yellow-400 transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
                  data-testid="footer-view-all-services"
                >
                  + View all 17 services →
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-body text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-5">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm text-neutral-300">
              <li>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  data-testid="footer-phone"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp"
                  className="hover:text-yellow-400 transition-colors"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="text-neutral-400 leading-relaxed">
                {BUSINESS.address}
              </li>
              <li className="text-neutral-500 text-xs uppercase tracking-widest">
                Mon — Sat · 07:00–18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <p className="font-body text-xs text-neutral-500">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Naledi · Soweto · South Africa
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
