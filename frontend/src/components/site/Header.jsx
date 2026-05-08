import { useState, useEffect } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const NAV_LINKS = [
  { href: "#services", label: "Lessons" },
  { href: "#why", label: "Why Us" },
  { href: "#packages", label: "Pricing" },
  { href: "#hours", label: "Hours" },
  { href: "#faq", label: "FAQ" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all bg-white border-b-2 border-[#0a0a0a] ${
        scrolled ? "shadow-[0_4px_0_0_rgba(125,211,252,1)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#top"
            data-testid="logo-link"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 lg:w-11 lg:h-11 bg-[#7dd3fc] border-2 border-[#0a0a0a] flex items-center justify-center shadow-brutal-sm">
              <span className="font-display font-black text-[#0a0a0a] text-lg leading-none">
                R
              </span>
            </div>
            <div className="leading-none">
              <div className="font-display font-black text-[#0a0a0a] tracking-tight text-base lg:text-lg uppercase">
                Ray Driving
              </div>
              <div className="font-body text-[10px] lg:text-[11px] tracking-[0.25em] uppercase text-[#0a0a0a]/60 font-semibold">
                School · Roodepoort
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-body text-sm font-bold text-[#0a0a0a] hover:text-[#0a0a0a]/60 transition-colors uppercase tracking-wider"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              data-testid="header-call-link"
              className="flex items-center gap-2 font-body text-sm font-bold text-[#0a0a0a]"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              {BUSINESS.phone}
            </a>
            <a
              href="#book"
              data-testid="header-book-btn"
              className="bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0a0a0a] font-body font-bold text-xs uppercase tracking-widest px-6 py-3 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
            >
              Book Lesson
            </a>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center border-2 border-[#0a0a0a] bg-white shadow-brutal-sm"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden border-t-2 border-[#0a0a0a] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-body text-sm font-bold py-3 border-b-2 border-[#0a0a0a]/10 uppercase tracking-wider text-[#0a0a0a]"
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="mobile-call-btn"
                className="flex items-center justify-center gap-2 border-2 border-[#0a0a0a] bg-white py-3 font-body font-bold text-sm uppercase tracking-widest shadow-brutal-sm"
              >
                <Phone className="w-4 h-4" /> Call {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-whatsapp-btn"
                className="flex items-center justify-center gap-2 bg-[#7dd3fc] text-[#0a0a0a] py-3 font-body font-bold text-sm uppercase tracking-widest border-2 border-[#0a0a0a] shadow-brutal-sm"
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
