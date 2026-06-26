import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";

export default function AnimalCard({ animal }) {
  return (
    <article className="card-hover overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-sm shadow-amber-100/70">
      <div className="relative h-52">
        <Image src={animal.image} alt={animal.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-amber-300 shadow">
          {animal.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="rounded-full bg-teal-55 px-3 py-1 text-xs font-black text-teal-700">{animal.type}</p>
          <p className="text-sm font-black text-amber-700">BDT {animal.price.toLocaleString("en-BD")}</p>
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-950">{animal.name}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-500">{animal.breed}</p>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-amber-50 px-3 py-1 font-bold">{animal.weight}</span>
          <span className="flex items-center gap-1 truncate">
            <FiMapPin /> {animal.location}
          </span>
        </div>
        <Link href={`/details-page/${animal.id}`} className="mt-5 inline-flex w-full justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-teal-700">
          View Details
        </Link>
      </div>
    </article>
  );
}
