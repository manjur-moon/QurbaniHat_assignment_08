import { FiCheckCircle } from "react-icons/fi";

const tips = [
  "Check animal age, health, and movement before booking.",
  "Compare weight and price with similar animals in the marketplace.",
  "Confirm location and delivery plan with the seller before Eid.",
  "Keep booking information and contact details accurate."
];

export default function QurbaniTips() {
  return (
    <section className="container-section py-12">
      <div className="market-card overflow-hidden p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-teal-700">Helpful Guide</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">Smart Qurbani Tips</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A few simple checks can help you book a healthy and suitable animal for your family.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip) => (
              <div key={tip} className="flex gap-3 rounded-3xl border border-teal-100 bg-teal-50 p-5">
                <FiCheckCircle className="mt-1 shrink-0 text-xl text-teal-700" />
                <p className="text-sm font-semibold leading-6 text-slate-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
