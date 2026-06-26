import AnimalsBrowser from "@/components/animals/AnimalsBrowser";

export const metadata = {
  title: "All Animals - QurbaniHat",
  description: "Browse and sort verified Qurbani cows and goats."
};

export default function AnimalsPage() {
  return (
    <section className="container-section py-10 md:py-16">
      <div className="mb-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">Marketplace</p>
        <h1 className="mt-3 text-3xl font-black md:text-5xl">All Farm Animals</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">
          Compare verified cows and goats by price, weight, breed, and location before booking.
        </p>
      </div>
      <AnimalsBrowser />
    </section>
  );
}
