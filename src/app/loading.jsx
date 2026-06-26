export default function Loading() {
  return (
    <div className="container-section py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-80 animate-pulse rounded-3xl border border-amber-100 bg-white shadow-sm" />
        ))}
      </div>
    </div>
  );
}
