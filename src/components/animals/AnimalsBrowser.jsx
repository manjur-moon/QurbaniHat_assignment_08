"use client";

import { useEffect, useMemo, useState } from "react";
import AnimalCard from "@/components/animals/AnimalCard";

export default function AnimalsBrowser() {
  const [animals, setAnimals] = useState([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadAnimals() {
      try {
        setLoading(true);
        const response = await fetch("/animals.json");
        if (!response.ok) {
          throw new Error("Unable to load animal data");
        }
        const data = await response.json();
        if (!ignore) {
          setAnimals(data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadAnimals();

    return () => {
      ignore = true;
    };
  }, []);

  const sortedAnimals = useMemo(() => {
    const copied = [...animals];

    if (sort === "low") {
      copied.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      copied.sort((a, b) => b.price - a.price);
    }

    return copied;
  }, [animals, sort]);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-80 animate-pulse rounded-[2rem] border border-amber-100 bg-white shadow-sm" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="rounded-3xl bg-red-50 p-6 text-center font-bold text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] border border-amber-100 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="font-black text-slate-800">Showing {sortedAnimals.length} farm verified animals</p>
          <p className="text-sm font-medium text-slate-500">Sort and compare before booking</p>
        </div>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-2xl border border-amber-100 bg-amber-50/50 px-4 py-3 text-sm font-black outline-none focus:border-teal-400"
        >
          <option value="default">Sort by price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </>
  );
}
