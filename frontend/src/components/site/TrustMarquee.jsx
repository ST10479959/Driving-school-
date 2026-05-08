import { BUSINESS } from "@/lib/constants";

export const TrustMarquee = () => {
  const items = [
    "ONE-ON-ONE LESSONS",
    "DUAL-CONTROLLED CAR",
    "TEST PREP & BOOKING",
    "PATIENT INSTRUCTORS",
    "FLEXIBLE SCHEDULES",
    "ROODEPOORT BASED",
    `CALL ${BUSINESS.phone}`,
  ];
  const all = [...items, ...items];

  return (
    <div data-testid="trust-marquee" className="bg-[#0a0a0a] text-[#7dd3fc] border-y-2 border-[#0a0a0a] overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap py-4">
        {all.map((it, i) => (
          <span
            key={i}
            className="font-display font-black uppercase tracking-tight text-sm sm:text-base mx-6 inline-flex items-center"
          >
            {it}
            <span className="mx-6 inline-block w-2 h-2 bg-[#7dd3fc] rotate-45" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrustMarquee;
