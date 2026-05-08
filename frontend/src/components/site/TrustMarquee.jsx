import { BUSINESS } from "@/lib/constants";

export const TrustMarquee = () => {
  const items = [
    `RELIABLE WORKMANSHIP`,
    `4.6★ RATED`,
    `BASED IN NALEDI, SOWETO`,
    `17 SPECIALIST SERVICES`,
    `AFFORDABLE QUOTES`,
    `${BUSINESS.phone}`,
    `WHATSAPP READY`,
  ];
  // duplicate to enable seamless loop
  const all = [...items, ...items];

  return (
    <div
      data-testid="trust-marquee"
      className="bg-yellow-400 text-neutral-950 border-y border-neutral-950/10 overflow-hidden"
    >
      <div className="marquee-track flex whitespace-nowrap py-4">
        {all.map((it, i) => (
          <span
            key={i}
            className="font-display font-black uppercase tracking-tighter text-sm sm:text-base mx-6 inline-flex items-center"
          >
            {it}
            <span className="mx-6 inline-block w-1.5 h-1.5 bg-neutral-950" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrustMarquee;
