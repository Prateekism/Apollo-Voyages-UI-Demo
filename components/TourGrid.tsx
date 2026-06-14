"use client";

import TourCard from "./TourCard";
import { Tour } from "@/types/tour";

interface Props {
  tours: Tour[];
}

export default function TourGrid({ tours }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="flex justify-between items-center mb-12">

        <div>
          <p className="uppercase tracking-[4px] text-amber-600 text-sm">
            Curated Experiences
          </p>

          <h2 className="text-5xl font-light mt-3">
            Explore India
          </h2>
        </div>

        <span className="text-zinc-500">
          {tours.length} Tours
        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
          />
        ))}
      </div>

    </section>
  );
}