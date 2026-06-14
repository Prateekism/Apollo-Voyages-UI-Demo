export const TOUR_CATEGORIES = [
  "Airport Transfer",
  "Beach Holiday",
  "Day Tours",
  "Excursion",
  "Family Holidays",
  "Golden Triangle Tours",
  "Honeymoon Tours",
  "India For The First Timer",
  "Luxury Train Journey",
  "Multi-Day Tours",
  "Segway Tour",
  "Sightseeing Tour",
  "Winter Holiday",
] as const;

export type TourCategory = (typeof TOUR_CATEGORIES)[number];
