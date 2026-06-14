import { Tour } from "@/types/tour";

interface Props {
  tours: Tour[];
}

function formatPrice(price: string | null): string {
  if (!price) return "Contact Us";
  return price.startsWith("₹") ? price : `₹${price}`;
}

export default function FeaturedTours({ tours }: Props) {
  const featured = tours.slice(0, 6);

  if (featured.length === 0) {
    return (
      <section className="bg-[#F8F6F2] py-24">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
          <p className="text-slate-500">No tours available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8F6F2] pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center sm:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
            Signature Collection
          </p>

          <h2
            className="mb-5 text-3xl font-light text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Featured Journeys
          </h2>

          <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
            Handpicked experiences crafted for travellers seeking luxury, culture,
            and unforgettable moments across India.
          </p>
        </div>

        <div className="mx-auto grid w-full gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {featured.map((tour) => (
            <article
              key={tour.id}
              className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="relative h-52 shrink-0 overflow-hidden sm:h-56">
                <img
                  src={tour.thumbnailImage}
                  alt={tour.tourName}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                    {tour.location}
                  </p>

                  {tour.duration && (
                    <span className="shrink-0 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                      {tour.duration}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="mb-3 line-clamp-2 min-h-[3.25rem] text-lg font-medium leading-snug text-slate-900 sm:text-xl">
                  {tour.tourName}
                </h3>

                <p className="mb-6 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {tour.fullDescription || tour.category}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <div className="min-w-0 flex-1 text-left">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-slate-400">
                      Starting From
                    </p>

                    <p className="text-lg font-semibold text-[#D4AF37] sm:text-xl">
                      {formatPrice(tour.priceINR)}
                    </p>
                  </div>

                  <a
                    href={tour.tourUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#c4a030] sm:px-5 sm:py-2.5"
                  >
                    Explore
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
