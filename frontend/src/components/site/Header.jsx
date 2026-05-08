import { useState, useEffect } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-neutral-200"
          : "bg-white/90 backdrop-blur border-b border-neutral-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#top"
            data-testid="logo-link"
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-yellow-400 flex items-center justify-center">
              <span className="font-display font-black text-neutral-950 text-lg">
                M
              </span>
            </div>
            <div className="leading-none">
              <div className="font-display font-black text-neutral-950 tracking-tighter text-base lg:text-lg uppercase">
                {BUSINESS.shortName}
              </div>
              <div className="font-body text-[10px] lg:text-[11px] tracking-widest uppercase text-neutral-500">
                Trading Enterprise
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className="font-body text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors uppercase tracking-wider"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              data-testid="header-call-link"
              className="flex items-center gap-2 font-body text-sm font-semibold text-neutral-950 hover:text-yellow-600 transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2.25} />
              {BUSINESS.phone}
            </a>
            <a
              href="#quote"
              data-testid="header-quote-btn"
              className="bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-body font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center border border-neutral-200"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden border-t border-neutral-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                className="font-body text-sm font-medium text-neutral-800 py-3 border-b border-neutral-100 uppercase tracking-wider"
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="mobile-call-btn"
                className="flex items-center justify-center gap-2 border border-neutral-300 py-3 font-body font-semibold text-sm uppercase tracking-widest"
              >
                <Phone className="w-4 h-4" /> Call {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-whatsapp-btn"
                className="flex items-center justify-center gap-2 bg-yellow-400 text-neutral-950 py-3 font-body font-bold text-sm uppercase tracking-widest"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
