"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { GiCow } from "react-icons/gi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/animals", label: "All Animals" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        }
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-amber-100/70 bg-[#fffaf0]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-[1.35rem] bg-slate-950 text-2xl text-amber-400 shadow-lg shadow-amber-200">
            <GiCow />
          </span>
          <div>
            <p className="text-xl font-black tracking-tight text-slate-950">QurbaniHat</p>
            <p className="-mt-1 text-xs font-black uppercase tracking-[0.2em] text-teal-700">Farm Mela</p>
          </div>
        </Link>

        <div className="hidden items-center rounded-full border border-amber-100 bg-white/80 px-3 py-2 shadow-sm md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-5 py-2 text-sm font-black transition ${
                  active ? "bg-slate-950 text-amber-300" : "text-slate-600 hover:bg-amber-50 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link href="/my-profile" className="flex items-center gap-2 rounded-full border border-amber-100 bg-white px-3 py-2 shadow-sm">
                <Avatar user={user} />
                <span className="max-w-24 truncate text-sm font-black text-slate-800">{user.name || "Profile"}</span>
              </Link>
              <button onClick={handleLogout} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:bg-teal-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline-soft py-2.5">
                Login
              </Link>
              <Link href="/register" className="btn-primary-soft py-2.5">
                Register
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-xl text-amber-300 md:hidden">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-amber-100 bg-[#fffaf0] px-4 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-black ${active ? "bg-slate-950 text-amber-300" : "bg-white text-slate-700"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            {user ? (
              <>
                <Link href="/my-profile" onClick={() => setOpen(false)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700">
                  My Profile
                </Link>
                <button onClick={handleLogout} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl border border-teal-200 bg-white px-4 py-3 text-center text-sm font-black text-teal-800">
                  Login
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="rounded-2xl bg-amber-500 px-4 py-3 text-center text-sm font-black text-slate-950">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Avatar({ user }) {
  if (user?.image) {
    return <img src={user.image} alt={user.name || "User"} className="h-9 w-9 rounded-full object-cover" />;
  }

  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-sm font-black text-amber-800">
      {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
    </span>
  );
}
