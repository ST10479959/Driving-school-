import { Crown, CheckCircle2, ChevronRight, Info } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const FLYER_URL =
  "https://customer-assets.emergentagent.com/job_mvelo-soweto/artifacts/3uiqyen2_IMG_8224.jpeg";

const PACKAGES = [
  {
    title: "Full Package",
    subtitle: "Code 8 & 10 — Learners + Licence",
    price: "R7 000",
    perks: [
      "Learners theory included",
      "Lessons until you're ready for test",
      "Free car or truck hire for test",
      "Pick-up & drop-off (Code 8 only)",
      "99% pass rate",
    ],
    cta: "Book Full Package",
  },
  {
    title: "Driving Licence",
    subtitle: "Code 8 & 10 — Lessons + Test",
    price: "R5 500",
    perks: [
      "Lessons until you're ready for test",
      "Free car or truck hire for test",
      "Pick-up & drop-off (Code 8 only)",
      "99% pass rate",
    ],
    cta: "Book Licence Lessons",
  },
  {
    title: "Code 14",
    subtitle: "Truck Licence — Learners + Lessons",
    price: "R11 400",
    perks: [
      "Learners theory included",
      "Lessons until you're ready for test",
      "Truck hire for test",
      "99% pass rate",
    ],
    cta: "Book Code 14",
  },
];

const INDIVIDUAL_LESSONS = [
  { lessons: "5", price: "R1 000" },
  { lessons: "10", price: "R2 000" },
  { lessons: "15", price: "R3 000" },
];

const TRAFFIC_FEES = [
  { label: "Learners confirmation", value: "R108" },
  { label: "Learners issuing", value: "R80" },
  { label: "Licence confirmation", value: "R228" },
  { label: "Licence collection", value: "R230" },
];

export const Packages = () => {
  return (
    <section
      id="packages"
      data-testid="packages-section"
      className="py-24 lg:py-32 bg-[#fafafa]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-7">
            <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#0a0a0a] mb-4">
              / Packages & pricing
            </p>
            <h2
              data-testid="packages-heading"
              className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Pick the package
              <br />
              <span className="bg-[#7dd3fc] border-2 border-[#0a0a0a] px-3 inline-block">
                that fits you.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="font-body text-base lg:text-lg text-[#4a4a4a] leading-relaxed">
              Bundles for learners, full Code 8 & 10 licence prep, and Code 14
              truck training — all backed by our 99% pass rate. Need just a few
              hours? Grab an individual lesson pack below.
            </p>
          </div>
        </div>

        {/* Student Special — featured card */}
        <div
          data-testid="student-special-card"
          className="relative bg-[#7dd3fc] border-2 border-[#0a0a0a] shadow-brutal p-7 lg:p-12 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#0a0a0a] text-[#7dd3fc] px-3 py-1.5 mb-5 border-2 border-[#0a0a0a]">
                <Crown className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] font-bold">
                  Student Special · Ages 17 – 21
                </span>
              </div>
              <h3 className="font-display font-black uppercase tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-[#0a0a0a]">
                R6 000
                <span className="block text-lg sm:text-xl font-bold normal-case tracking-normal mt-3 text-[#0a0a0a]/80">
                  Learners + 15 lessons + Car or Truck hire + Licence
                </span>
              </h3>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="student-special-perks">
                {[
                  "Includes learner's training",
                  "15 driving lessons",
                  "Free car or truck hire for test",
                  "Pick-up & drop-off (Code 8)",
                  "99% pass rate guaranteed",
                  "Exclusive student rate",
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm font-semibold text-[#0a0a0a]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <a
                href="#book"
                data-testid="student-special-book-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] hover:bg-[#0a0a0a]/90 text-white font-body font-bold text-sm uppercase tracking-widest px-6 py-5 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
              >
                Claim Student Special
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="student-special-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-6 py-5 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
              >
                WhatsApp to Confirm
              </a>
            </div>
          </div>
        </div>

        {/* Standard packages */}
        <div data-testid="packages-grid" className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {PACKAGES.map((pkg, i) => (
            <div
              key={i}
              data-testid={`package-card-${i}`}
              className="bg-white border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all p-7 lg:p-8 flex flex-col"
            >
              <div className="border-b-2 border-[#0a0a0a]/15 pb-5 mb-5">
                <p className="font-body text-[11px] uppercase tracking-[0.25em] font-bold text-[#0a0a0a]/60">
                  {pkg.subtitle}
                </p>
                <h3 className="font-display font-black uppercase text-2xl lg:text-3xl tracking-tight text-[#0a0a0a] mt-2">
                  {pkg.title}
                </h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display font-black text-4xl lg:text-5xl tracking-tighter text-[#0a0a0a]">
                    {pkg.price}
                  </span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1">
                {pkg.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-body text-sm text-[#0a0a0a]/85">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0a0a0a]" strokeWidth={2.5} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                data-testid={`package-cta-${i}`}
                className="mt-7 inline-flex items-center justify-center gap-2 bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
              >
                {pkg.cta}
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
            </div>
          ))}
        </div>

        {/* Individual lessons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div
            data-testid="individual-lessons-card"
            className="lg:col-span-8 bg-[#0a0a0a] text-white border-2 border-[#0a0a0a] shadow-brutal-sm p-7 lg:p-10"
          >
            <p className="font-body text-[11px] uppercase tracking-[0.25em] font-bold text-[#7dd3fc] mb-3">
              Pay-per-lesson · Code 8 (Manual / Automatic)
            </p>
            <h3 className="font-display font-black uppercase tracking-tighter text-3xl sm:text-4xl lg:text-5xl leading-[0.95]">
              Individual lessons.
            </h3>
            <p className="mt-4 font-body text-sm lg:text-base text-white/70 max-w-md">
              Already got your learner's? Top up with hours that suit you.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4" data-testid="individual-lessons-grid">
              {INDIVIDUAL_LESSONS.map((row, i) => (
                <div
                  key={i}
                  data-testid={`individual-lesson-${i}`}
                  className="bg-white text-[#0a0a0a] border-2 border-[#7dd3fc] p-5 lg:p-6"
                >
                  <div className="font-display font-black text-3xl lg:text-4xl tracking-tighter">
                    {row.price}
                  </div>
                  <div className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/70 mt-2">
                    {row.lessons} Lessons
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Original flyer */}
          <a
            href={FLYER_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="flyer-link"
            className="lg:col-span-4 group block bg-white border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all overflow-hidden"
          >
            <div className="aspect-[4/5] overflow-hidden border-b-2 border-[#0a0a0a] bg-white">
              <img
                src={FLYER_URL}
                alt="Ray Driving School pricing flyer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <p className="font-body text-[10px] uppercase tracking-[0.25em] font-bold text-[#0a0a0a]/60 mb-1">
                The original
              </p>
              <p className="font-display font-bold text-base text-[#0a0a0a] leading-snug">
                Tap to view our pricing flyer →
              </p>
            </div>
          </a>
        </div>

        {/* Traffic dept fees note */}
        <div
          data-testid="traffic-fees-note"
          className="bg-white border-2 border-[#0a0a0a] p-6 lg:p-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 flex items-center justify-center bg-[#7dd3fc] border-2 border-[#0a0a0a] flex-shrink-0">
              <Info className="w-4 h-4 text-[#0a0a0a]" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.25em] font-bold text-[#0a0a0a]">
                Important — Traffic Department Fees
              </p>
              <p className="font-body text-sm text-[#4a4a4a] mt-1 leading-relaxed">
                Government fees are paid directly by the client at the testing
                centre using their bank card. These are <strong>not</strong>{" "}
                included in package prices.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#0a0a0a]/15 border border-[#0a0a0a]/15 mt-2">
            {TRAFFIC_FEES.map((f, i) => (
              <li
                key={i}
                data-testid={`traffic-fee-${i}`}
                className="bg-white p-4 flex flex-col gap-1"
              >
                <span className="font-display font-black text-xl text-[#0a0a0a]">
                  {f.value}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.2em] font-semibold text-[#4a4a4a]">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 font-body text-xs text-[#4a4a4a] leading-relaxed">
            Clients arrange their own transport to confirm bookings at the
            traffic department. We provide transport for the test day only
            (Code 8 packages).
          </p>
        </div>
      </div>
    </section>
  );
};

export default Packages;
