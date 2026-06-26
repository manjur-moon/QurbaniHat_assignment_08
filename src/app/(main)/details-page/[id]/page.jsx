import Image from "next/image";
import { notFound } from "next/navigation";
import BookingForm from "@/components/animals/BookingForm";
import { getAnimalById } from "@/lib/data";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    return {
      title: "Animal Not Found - QurbaniHat"
    };
  }

  return {
    title: `${animal.name} - QurbaniHat`,
    description: animal.description
  };
}

export default async function AnimalDetailsPage({ params }) {
  const { id } = await params;
  const session = await requireUser(`/login?callbackURL=/details-page/${id}`);
  const animal = await getAnimalById(id);

  if (!animal) {
    notFound();
  }

  return (
    <section className="container-section py-10 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-xl">
          <div className="relative h-[320px] md:h-[520px]">
            <Image src={animal.image} alt={animal.name} fill priority className="object-cover" />
            <div className="absolute left-5 top-5 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-amber-300 shadow">
              {animal.category}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="market-card p-6 md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-teal-700">{animal.type}</p>
            <h1 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">{animal.name}</h1>
            <p className="mt-4 leading-7 text-slate-600">{animal.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Info label="Breed" value={animal.breed} />
              <Info label="Location" value={animal.location} />
              <Info label="Weight" value={animal.weight} />
              <Info label="Age" value={animal.age} />
            </div>

            <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-sm font-medium text-amber-200">Booking Price</p>
              <p className="text-3xl font-black text-amber-300">BDT {animal.price.toLocaleString("en-BD")}</p>
            </div>
          </div>

          <BookingForm user={session.user} animalName={animal.name} />
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">{label}</p>
      <p className="mt-1 font-black text-slate-800">{value}</p>
    </div>
  );
}
