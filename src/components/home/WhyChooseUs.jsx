import { FiMapPin, FiShield, FiTruck } from "react-icons/fi";

const items = [
  { icon: FiShield, title: "Verified Listings", text: "Every listing includes clear price, breed, weight, location, and image information." },
  { icon: FiMapPin, title: "Local Farm Access", text: "Find animals from popular farming districts and compare before booking." },
  { icon: FiTruck, title: "Easy Booking Flow", text: "Authenticated users can book quickly with a simple form and instant confirmation." }
];

export default function WhyChooseUs() {
  return (
    <section className="container-section py-12">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl md:p-10">
        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="relative mb-8 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">Why Choose QurbaniHat</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">A cleaner, warmer way to plan your Qurbani purchase.</h2>
        </div>
        <div className="relative grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-300 text-xl text-slate-950">
                  <Icon />
                </span>
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
