"use client";

import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Search, X } from "lucide-react";
import { Tour } from "@/types/tour";
import { TOUR_CATEGORIES } from "@/lib/tourCategories";
import TourListCard from "./TourListCard";

interface Props {
  tours: Tour[];
  variant?: "standalone" | "home";
}

type SortKey =
  | "latest"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "views-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "name-asc", label: "Name - Ascending" },
  { value: "name-desc", label: "Name - Descending" },
  { value: "price-asc", label: "Price - Low to High" },
  { value: "price-desc", label: "Price - High to Low" },
  { value: "views-desc", label: "Most Viewed" },
];

const PAGE_SIZE = 8;

function toNumber(value: string | null | undefined): number {
  if (!value) return 0;
  const digits = value.replace(/[^0-9.]/g, "");
  return digits ? parseFloat(digits) : 0;
}

function getCities(location: string): string[] {
  return location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function ToursExplorer({ tours, variant = "standalone" }: Props) {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dropdownLocation, setDropdownLocation] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Day Tours",
  ]);
  const [sort, setSort] = useState<SortKey>("latest");
  const [page, setPage] = useState(1);

  const locationFacets = useMemo(() => {
    const counts = new Map<string, number>();
    tours.forEach((tour) => {
      getCities(tour.location).forEach((city) => {
        counts.set(city, (counts.get(city) ?? 0) + 1);
      });
    });
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tours]);

  const categoryFacets = useMemo(() => {
    const counts = new Map<string, number>();
    TOUR_CATEGORIES.forEach((cat) => counts.set(cat, 0));
    tours.forEach((tour) => {
      if (tour.category) {
        counts.set(tour.category, (counts.get(tour.category) ?? 0) + 1);
      }
    });
    return TOUR_CATEGORIES.map((name) => ({
      name,
      count: counts.get(name) ?? 0,
    }));
  }, [tours]);

  const filtered = useMemo(() => {
    const term = keyword.trim().toLowerCase();

    const result = tours.filter((tour) => {
      const matchesKeyword =
        !term ||
        tour.tourName.toLowerCase().includes(term) ||
        tour.location.toLowerCase().includes(term) ||
        (tour.fullDescription ?? "").toLowerCase().includes(term);

      const matchesLocation =
        selectedLocations.length === 0 ||
        getCities(tour.location).some((city) =>
          selectedLocations.includes(city)
        );

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(tour.category);

      return matchesKeyword && matchesLocation && matchesCategory;
    });

    const sorted = [...result];
    switch (sort) {
      case "name-asc":
        sorted.sort((a, b) => a.tourName.localeCompare(b.tourName));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.tourName.localeCompare(a.tourName));
        break;
      case "price-asc":
        sorted.sort((a, b) => toNumber(a.priceINR) - toNumber(b.priceINR));
        break;
      case "price-desc":
        sorted.sort((a, b) => toNumber(b.priceINR) - toNumber(a.priceINR));
        break;
      case "views-desc":
        sorted.sort((a, b) => toNumber(b.views) - toNumber(a.views));
        break;
      default:
        sorted.sort((a, b) => a.id - b.id);
    }
    return sorted;
  }, [tours, keyword, selectedLocations, selectedCategories, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  const toggleLocation = (city: string) => {
    setPage(1);
    setSelectedLocations((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const toggleCategory = (cat: string) => {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const selectCategoryCircle = (cat: string) => {
    setPage(1);
    setSelectedCategories([cat]);
  };

  const clearLocations = () => {
    setPage(1);
    setSelectedLocations([]);
    setDropdownLocation("");
  };

  const clearCategories = () => {
    setPage(1);
    setSelectedCategories([]);
  };

  const clearAll = () => {
    setPage(1);
    setKeyword("");
    setStartDate("");
    setDropdownLocation("");
    setSelectedLocations([]);
    setSelectedCategories([]);
  };

  const handleSearch = () => {
    setPage(1);
    if (dropdownLocation) {
      setSelectedLocations((prev) =>
        prev.includes(dropdownLocation) ? prev : [...prev, dropdownLocation]
      );
    }
  };

  const hasFilters =
    keyword.trim() !== "" ||
    selectedLocations.length > 0 ||
    selectedCategories.length > 0;

  return (
    <>
      {variant === "standalone" && (
        <section className="relative flex h-56 items-end bg-slate-900 pb-10 sm:h-64">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/herobanner.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/70">
              Home &rsaquo; Tour Categories &rsaquo; Day Tours
            </p>
            <h1 className="text-5xl font-bold uppercase tracking-wide text-white sm:text-6xl">
              Tour
            </h1>
          </div>
        </section>
      )}

      <section id="tours" className="border-b border-slate-200 bg-white py-8 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto pb-2">
            {categoryFacets.map((cat) => {
              const active = selectedCategories.includes(cat.name);
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => selectCategoryCircle(cat.name)}
                  className="flex shrink-0 flex-col items-center gap-2"
                >
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors ${
                      active
                        ? "border-[#D4AF37] bg-[#D4AF37] text-slate-900"
                        : "border-slate-200 bg-white text-slate-400 hover:border-[#D4AF37]"
                    }`}
                  >
                    <MapPin size={22} />
                  </span>
                  <span
                    className={`max-w-[88px] text-center text-[11px] leading-tight ${
                      active ? "font-semibold text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F6F2] py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <aside className="space-y-0">
            <div className="rounded-t-2xl bg-[#c2185b] px-5 py-6 text-white">
              <h2 className="mb-5 text-center text-lg font-bold uppercase tracking-wide">
                Find Your Tour
              </h2>

              <label className="mb-1.5 block text-sm font-medium">Keyword?</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(1);
                }}
                placeholder="Enter a keyword"
                className="mb-4 h-11 w-full rounded-lg border-0 bg-white px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <label className="mb-1.5 block text-sm font-medium">Where?</label>
              <select
                value={dropdownLocation}
                onChange={(e) => setDropdownLocation(e.target.value)}
                className="mb-4 h-11 w-full cursor-pointer rounded-lg border-0 bg-white px-3 text-sm text-slate-800 outline-none"
              >
                <option value="">Choose Location</option>
                {locationFacets.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>

              <label className="mb-1.5 block text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mb-5 h-11 w-full rounded-lg border-0 bg-white px-3 text-sm text-slate-800 outline-none"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ff9800] py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition-colors hover:bg-[#f57c00]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <ArrowRight size={16} />
                </span>
                Search
              </button>
            </div>

            <div className="border border-t-0 border-slate-200 bg-white px-5 py-5">
              <h3 className="mb-4 border-b border-slate-200 pb-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-slate-600">
                Locations
              </h3>
              <ul className="max-h-72 space-y-0.5 overflow-y-auto">
                {locationFacets.map((f) => (
                  <li key={f.name}>
                    <label className="flex cursor-pointer items-center justify-between py-1.5 text-sm text-slate-600 hover:text-slate-900">
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(f.name)}
                          onChange={() => toggleLocation(f.name)}
                          className="h-4 w-4 accent-[#c2185b]"
                        />
                        {f.name}
                      </span>
                      <span className="text-slate-400">{f.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-b-2xl border border-t-0 border-slate-200 bg-white px-5 py-5">
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                <button
                  type="button"
                  onClick={clearCategories}
                  className="text-xs font-medium text-[#c2185b] hover:underline"
                >
                  Clear
                </button>
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-600">
                  Categories
                </h3>
                <span className="w-8" />
              </div>
              <ul className="max-h-80 space-y-0.5 overflow-y-auto">
                {categoryFacets.map((f) => (
                  <li key={f.name}>
                    <label
                      className={`flex cursor-pointer items-center justify-between py-1.5 text-sm hover:text-slate-900 ${
                        f.count === 0 ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(f.name)}
                          onChange={() => toggleCategory(f.name)}
                          disabled={f.count === 0}
                          className="h-4 w-4 accent-[#c2185b] disabled:opacity-40"
                        />
                        {f.name}
                      </span>
                      <span className="text-slate-400">{f.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {rangeStart}-{rangeEnd}
                  </span>{" "}
                  of {filtered.length} results
                  {selectedCategories.length > 0 && " for"}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {selectedCategories.map((chip) => (
                    <button
                      key={`cat-${chip}`}
                      type="button"
                      onClick={() => toggleCategory(chip)}
                      className="inline-flex items-center gap-1 rounded bg-[#c2185b] px-2.5 py-1 text-xs font-medium text-white"
                    >
                      {chip}
                      <X size={12} />
                    </button>
                  ))}
                  {selectedLocations.map((chip) => (
                    <button
                      key={`loc-${chip}`}
                      type="button"
                      onClick={() => toggleLocation(chip)}
                      className="inline-flex items-center gap-1 rounded bg-[#c2185b] px-2.5 py-1 text-xs font-medium text-white"
                    >
                      {chip}
                      <X size={12} />
                    </button>
                  ))}
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-xs font-medium text-[#D4AF37] hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortKey);
                    setPage(1);
                  }}
                  className="h-10 min-w-[160px] cursor-pointer rounded border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#D4AF37]"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {paginated.length === 0 ? (
              <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
                <Search size={40} className="mx-auto mb-4 text-slate-300" />
                <p className="text-slate-500">
                  No tours match your filters.{" "}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="font-medium text-[#c2185b] underline"
                  >
                    Clear all
                  </button>
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  {paginated.map((tour) => (
                    <TourListCard key={tour.id} tour={tour} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav
                    className="mt-10 flex items-center justify-center gap-2"
                    aria-label="Pagination"
                  >
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-[#D4AF37] disabled:opacity-40"
                    >
                      &lsaquo;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setPage(n)}
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                            n === currentPage
                              ? "bg-[#D4AF37] text-slate-900"
                              : "border border-slate-200 text-slate-600 hover:border-[#D4AF37]"
                          }`}
                        >
                          {n}
                        </button>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-[#D4AF37] disabled:opacity-40"
                    >
                      &rsaquo;
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
