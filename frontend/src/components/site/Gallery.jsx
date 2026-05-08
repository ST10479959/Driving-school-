import { GALLERY } from "@/lib/constants";

export const Gallery = () => {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="bg-neutral-50 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
              / 03 — Recent Work
            </p>
            <h2
              data-testid="gallery-heading"
              className="font-display font-black uppercase text-neutral-950 tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Site by site.
              <br />
              Job by job.
            </h2>
          </div>
          <p className="font-body text-base text-neutral-600 max-w-md">
            A selection of recent projects across Soweto — from flooring and
            tiling to architectural plans and full renovations.
          </p>
        </div>

        <div
          data-testid="gallery-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200"
        >
          {GALLERY.map((g, i) => (
            <div
              key={i}
              data-testid={`gallery-item-${i}`}
              className="group relative bg-white overflow-hidden aspect-[4/5]"
            >
              <img
                src={g.url}
                alt={g.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/0 to-neutral-950/0" />
              <div className="absolute top-4 left-4">
                <span className="font-body text-[10px] uppercase tracking-[0.25em] font-bold bg-yellow-400 text-neutral-950 px-2.5 py-1.5">
                  {g.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <h3 className="font-display font-bold text-white text-xl lg:text-2xl tracking-tight">
                  {g.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
