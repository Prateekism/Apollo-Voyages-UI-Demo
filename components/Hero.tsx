export default function Hero() {
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/herobanner.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center lg:px-8 lg:py-32">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
          Curated Luxury Experiences
        </p>

        <h1
          className="mb-6 text-4xl font-light leading-[1.15] text-white sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Discover India Beyond the Ordinary
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Bespoke journeys through India&apos;s most extraordinary destinations,
          designed for travellers seeking elegance, culture, and unforgettable
          experiences.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-semibold text-slate-900">
            Explore Tours
          </span>

          <span className="rounded-full border border-white/80 px-8 py-3.5 text-sm font-medium text-white">
            View Destinations
          </span>
        </div>
      </div>
    </section>
  );
}
