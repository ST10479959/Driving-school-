import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/constants";

export const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" data-testid="faq-section" className="py-24 lg:py-32 bg-white border-y-2 border-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#0a0a0a] mb-4">
            / Common questions
          </p>
          <h2
            data-testid="faq-heading"
            className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
          >
            Frequently asked.
            <br />
            <span className="bg-[#7dd3fc] border-2 border-[#0a0a0a] px-3 inline-block">
              Honestly answered.
            </span>
          </h2>
        </div>

        <ul data-testid="faq-list" className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const Icon = isOpen ? Minus : Plus;
            return (
              <li
                key={i}
                data-testid={`faq-item-${i}`}
                className={`border-2 border-[#0a0a0a] transition-all ${
                  isOpen ? "bg-[#7dd3fc] shadow-brutal-sm" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  data-testid={`faq-toggle-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base lg:text-lg text-[#0a0a0a] leading-snug">
                    {f.q}
                  </span>
                  <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-white border-2 border-[#0a0a0a]">
                    <Icon className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>
                {isOpen && (
                  <div data-testid={`faq-answer-${i}`} className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-2 font-body text-sm lg:text-base text-[#0a0a0a]/80 leading-relaxed border-t-2 border-[#0a0a0a]/30 pt-4">
                    {f.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
