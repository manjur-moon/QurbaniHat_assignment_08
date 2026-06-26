import Link from "next/link";

export default function ProfileCard({ user }) {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-2xl shadow-amber-100/50">
      <div className="relative h-40 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-teal-500/30" />
        <div className="absolute bottom-5 left-8 rounded-full bg-amber-300 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-950">
          Buyer Profile
        </div>
      </div>
      <div className="px-6 pb-8 text-center md:px-10">
        <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-8 border-white bg-amber-100 shadow-lg">
          {user?.image ? (
            <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-5xl font-black text-amber-700">
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h1 className="mt-5 text-3xl font-black text-slate-950">{user?.name || "QurbaniHat User"}</h1>
        <p className="mt-2 text-slate-500">{user?.email}</p>

        <div className="mt-8 grid gap-4 rounded-[2rem] bg-amber-50/60 p-5 text-left md:grid-cols-2">
          <Info label="Name" value={user?.name || "Not added"} />
          <Info label="Email" value={user?.email || "Not added"} />
          <Info label="Profile Status" value="Logged In" />
          <Info label="Role" value="Buyer" />
        </div>

        <Link href="/my-profile/update" className="btn-primary-soft mt-8">
          Update Information
        </Link>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">{label}</p>
      <p className="mt-1 break-words font-black text-slate-800">{value}</p>
    </div>
  );
}
