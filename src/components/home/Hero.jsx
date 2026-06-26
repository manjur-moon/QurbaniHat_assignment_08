import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaMapMarkerAlt, FaWeightHanging } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fff7ed] to-transparent" />

      <div className="container-section relative grid min-h-[80vh] items-center gap-10 py-16 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm font-black uppercase tracking-[0.22em] text-amber-300">
            QurbaniHat — Firm Fair
          </p>

          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Find a verified <span className="text-amber-300">Qurbani animal</span> from trusted farms.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
            A fresh marketplace experience with warm mela colors, farm verified livestock, simple sorting, and protected booking after login.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/animals" className="btn-primary-soft">
              Browse Animals
            </Link>
            <Link href="/register" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/20">
              Create Account
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <Stat value="8+" label="Listings" />
            <Stat value="5" label="Districts" />
            <Stat value="100%" label="Responsive" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-3 -top-10 hidden rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 shadow-xl md:block">
            Live Farm Picks
          </div>

          <div className="rotate-0 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-teal-950/50 backdrop-blur sm:p-6 lg:rotate-2">
            <div className="relative h-[360px] overflow-hidden rounded-[2rem] sm:h-[430px]">
              <Image
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1400&auto=format&fit=crop"
                alt="Healthy farm cow ready for Qurbani booking"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-black text-slate-950 shadow-lg">
                <FaCheckCircle />
                Farm Verified
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
                <p className="text-sm font-semibold text-amber-200">This week special</p>
                <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                  Premium livestock ready for booking
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <InfoCard icon={<FaWeightHanging />} text="420 kg healthy bull" />
                  <InfoCard icon={<FaMapMarkerAlt />} text="Savar, Dhaka farm" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 hidden rounded-[1.5rem] border border-amber-200 bg-white p-4 text-slate-950 shadow-xl sm:block">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Starting from</p>
            <p className="text-2xl font-black text-teal-700">৳22,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
      <p className="text-2xl font-black text-amber-300">{value}</p>
      <p className="text-xs font-black uppercase tracking-wider text-slate-300">{label}</p>
    </div>
  );
}

function InfoCard({ icon, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/15 p-4 backdrop-blur">
      <p className="flex items-center gap-2 text-sm font-black">
        <span className="text-amber-300">{icon}</span>
        {text}
      </p>
    </div>
  );
}
