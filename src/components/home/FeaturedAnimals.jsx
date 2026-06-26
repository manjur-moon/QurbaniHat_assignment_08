import Link from "next/link";
import AnimalCard from "@/components/animals/AnimalCard";

export default function FeaturedAnimals({ animals }) {
  return (
    <section className="container-section py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="badge-market w-fit">Featured Picks</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Popular Farm Animals</h2>
          <p className="mt-3 max-w-2xl text-slate-600">A curated mela-style showcase of trusted animals for a smooth Qurbani booking experience.</p>
        </div>
        <Link href="/animals" className="btn-outline-soft w-fit">
          View All Animals
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </section>
  );
}
