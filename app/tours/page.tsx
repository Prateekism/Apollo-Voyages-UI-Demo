import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ToursExplorer from "@/components/ToursExplorer";
import { getTours } from "@/services/api";
import { Tour } from "@/types/tour";

export const metadata: Metadata = {
  title: "Tours – Apollo Voyages",
  description: "Browse and filter curated luxury tours across India.",
};

export default async function ToursPage() {
  const tours: Tour[] = await getTours();

  return (
    <>
      <Navbar />
      <ToursExplorer tours={tours} />
    </>
  );
}
