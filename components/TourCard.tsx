"use client";

import { Tour } from "@/types/tour";

interface Props {
  tour: Tour;
}

export default function TourCard({ tour }: Props) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">

      <div className="relative overflow-hidden h-72">
        <img
          src={tour.thumbnailImage}
          alt={tour.tourName}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-semibold">
            {tour.category}
          </span>
        </div>
      </div>

      <div className="p-7">

        <div className="text-sm text-zinc-500 mb-2">
          {tour.location}
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 line-clamp-2 mb-4">
          {tour.tourName}
        </h3>

        <div className="flex justify-between items-center">

          <div>
            <p className="text-xs text-zinc-500">
              Starting From
            </p>

            <p className="text-2xl font-bold text-amber-600">
              {tour.priceINR || "Contact Us"}
            </p>
          </div>

          <button className="px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 transition">
            Explore
          </button>
        </div>
      </div>
    </article>
  );
}