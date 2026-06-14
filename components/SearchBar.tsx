export default function SearchBar() {
  const fieldClass =
    "h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20";

  return (
    <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <input
            type="text"
            placeholder="Destination"
            readOnly
            className={`${fieldClass} cursor-default bg-slate-50`}
          />

          <input
            type="date"
            readOnly
            className={`${fieldClass} cursor-default bg-slate-50`}
          />

          <span className="flex h-14 w-full items-center justify-center rounded-xl bg-[#D4AF37] text-sm font-semibold text-slate-900">
            Search Tours
          </span>
        </div>
      </div>
    </div>
  );
}
