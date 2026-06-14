const stats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "5000+", label: "Luxury Travellers" },
  { number: "250+", label: "Curated Experiences" },
  { number: "50+", label: "Destinations" },
];

export default function StatsBar() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
        {stats.map((item) => (
          <div key={item.label} className="text-center">
            <p
              className="mb-2 text-4xl font-light text-[#D4AF37] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {item.number}
            </p>

            <p className="text-[11px] uppercase tracking-[0.2em] text-white/60 sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
