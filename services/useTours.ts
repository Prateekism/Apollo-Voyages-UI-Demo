"use client";

import { useEffect, useState } from "react";
import { getPackages } from "./api";

export function useTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await getPackages();
        setTours(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  return {
    tours,
    loading,
  };
}