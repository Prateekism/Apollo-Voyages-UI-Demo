import { Eye, Plus, Share2 } from "lucide-react";
import { Tour } from "@/types/tour";

interface Props {
  tour: Tour;
}

export default function TourListCard({ tour }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.thumbnailImage}
          alt={tour.tourName}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {tour.location && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-slate-700">
            {tour.location}
          </span>
        )}

        <h3 className="absolute bottom-4 left-4 right-14 text-base font-semibold uppercase leading-snug text-white">
          {tour.tourName}
        </h3>

        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-slate-900"
        >
          <Plus size={20} />
        </span>
      </div>

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 text-slate-400">
        <span className="flex items-center gap-1.5 text-sm">
          <Eye size={16} />
          {tour.views ?? "—"}
        </span>
        <Share2 size={16} aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {tour.priceUSD ? (
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#D4AF37]">
              {tour.priceUSD}
            </span>
            {tour.tourType && (
              <span className="text-sm text-slate-500">{tour.tourType}</span>
            )}
          </div>
        ) : (
          <p className="mb-2 text-base font-medium text-slate-700">
            Price Available on Request
          </p>
        )}

        {tour.priceINR && (
          <p className="mb-5 text-sm text-slate-500">
            Starting from{" "}
            <span className="font-medium text-slate-700">{tour.priceINR}</span>{" "}
            per person on twin sharing
          </p>
        )}

        <span className="mt-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
          Book Now
        </span>
      </div>
    </article>
  );
}
