"use client";

import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

const navLinks = [
  "Destinations",
  "Tours",
  "Experiences",
  "Luxury Journeys",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <span
          className="text-xl font-light tracking-[0.2em] text-slate-900 sm:text-2xl sm:tracking-[0.25em]"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          APOLLO
        </span>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((label) => (
            <span
              key={label}
              className="whitespace-nowrap text-sm text-slate-600"
            >
              {label}
            </span>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:gap-4 lg:flex">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600"
          >
            <Search size={18} />
          </span>

          <span className="whitespace-nowrap rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-slate-900 sm:px-6 sm:py-3">
            Plan My Trip
          </span>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((label) => (
              <span
                key={label}
                className="border-b border-slate-100 pb-3 text-sm text-slate-700 last:border-0 last:pb-0"
              >
                {label}
              </span>
            ))}
          </nav>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600"
            >
              <Search size={18} />
            </span>

            <span className="flex-1 rounded-full bg-[#D4AF37] py-3 text-center text-sm font-semibold text-slate-900">
              Plan My Trip
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
