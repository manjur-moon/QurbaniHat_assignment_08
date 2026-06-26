const breeds = [
  { name: "Local Deshi", type: "Cow", note: "Affordable and easy to handle" },
  { name: "Brahman", type: "Cow", note: "Large size and premium build" },
  { name: "Black Bengal", type: "Goat", note: "Popular local goat breed" },
  { name: "Jamunapari", type: "Goat", note: "Tall, elegant, and premium" }
];

export default function TopBreeds() {
  return (
    <section className="container-section py-12">
      <div className="mb-8 text-center">
        <p className="badge-market mx-auto w-fit">Top Breeds</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Choose by Breed</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {breeds.map((breed, index) => (
          <div key={breed.name} className="card-hover rounded-[2rem] border border-amber-100 bg-white p-6 shadow-sm">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-amber-300">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="text-sm font-black text-teal-700">{breed.type}</p>
            <h3 className="mt-2 text-xl font-black text-slate-950">{breed.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{breed.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
