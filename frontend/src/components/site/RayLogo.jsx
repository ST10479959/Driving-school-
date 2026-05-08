// Brand mark using the colourful Ray Driving School wordmark style
// Letters in: red, yellow, green, blue, purple — matching the flyer logo

export const RayLogo = ({ size = "md", showSubtitle = true, className = "" }) => {
  const sizes = {
    sm: { letter: "text-base", subtitle: "text-[9px]" },
    md: { letter: "text-lg", subtitle: "text-[10px]" },
    lg: { letter: "text-2xl", subtitle: "text-xs" },
  };
  const s = sizes[size] || sizes.md;

  const letters = [
    { ch: "R", color: "#dc2626" }, // red
    { ch: "A", color: "#facc15" }, // yellow
    { ch: "Y", color: "#16a34a" }, // green
  ];
  const accents = [
    { ch: "·", color: "#2563eb" },
  ];

  return (
    <div className={`leading-none ${className}`}>
      <div className={`flex items-baseline gap-0.5 font-display font-black tracking-tight ${s.letter} uppercase`}>
        {letters.map((l, i) => (
          <span
            key={i}
            style={{ color: l.color, textShadow: "1px 1px 0 #0a0a0a" }}
            className="font-black"
          >
            {l.ch}
          </span>
        ))}
        {accents.map((a, i) => (
          <span key={i} style={{ color: a.color }} className="font-black ml-0.5">
            {a.ch}
          </span>
        ))}
        <span style={{ color: "#0a0a0a" }} className="font-black ml-1">
          DRIVING
        </span>
      </div>
      {showSubtitle && (
        <div
          className={`font-body ${s.subtitle} tracking-[0.25em] uppercase text-[#0a0a0a]/70 font-bold mt-0.5`}
        >
          School · Roodepoort
        </div>
      )}
    </div>
  );
};

// Compact badge tile (uses colourful gradient block) for use in Header/Footer where space is tight
export const RayMark = ({ size = "md" }) => {
  const sz = {
    sm: "w-9 h-9 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl",
  }[size];
  return (
    <div
      className={`${sz} flex-shrink-0 flex items-center justify-center border-2 border-[#0a0a0a] shadow-brutal-sm font-display font-black uppercase`}
      style={{
        background:
          "linear-gradient(135deg, #dc2626 0%, #facc15 33%, #16a34a 66%, #2563eb 100%)",
      }}
    >
      <span className="text-white" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>
        R
      </span>
    </div>
  );
};

export default RayLogo;
