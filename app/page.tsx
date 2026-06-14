import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import StatsBar from "@/components/StatsBar";
import ToursExplorer from "@/components/ToursExplorer";

import { getTours } from "@/services/api";

export default async function Home() {
  const tours = await getTours();

  return (
    <>
      <Navbar />
      <Hero />

      <section className="bg-[var(--dark)] pb-20 sm:pb-24">
        <div className="relative z-20 -mt-16 mb-20 w-full sm:-mt-20 sm:mb-24">
          <SearchBar />
        </div>
        <StatsBar />
      </section>

      <ToursExplorer tours={tours} variant="home" />
    </>
  );
}
