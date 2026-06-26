import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-section flex min-h-[70vh] items-center justify-center py-16 text-center">
      <div className="market-card max-w-xl p-10">
        <p className="badge-market mx-auto w-fit">404</p>
        <h1 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">Page not found</h1>
        <p className="mt-4 text-slate-600">
          The animal or page you are looking for may have been moved or removed from QurbaniHat.
        </p>
        <Link href="/" className="btn-primary-soft mt-8">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
