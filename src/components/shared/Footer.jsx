import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { GiCow } from "react-icons/gi";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: FaLinkedinIn }
];

export default function Footer() {
  return (
    <footer className="mt-16 overflow-hidden bg-slate-950 text-white">
      <div className="container-section relative py-14">
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-[1.35rem] bg-amber-500 text-2xl text-slate-950">
                <GiCow />
              </span>
              <div>
                <h2 className="text-2xl font-black">QurbaniHat</h2>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-300">Livestock Booking Platform</p>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              A unique livestock booking platform where families can explore verified cows and goats with a warm mela-inspired design.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <p>Hotline: +880 1711 000 777</p>
              <p>Email: support@qurbanihat.com</p>
              <p>Address: Farmgate, Dhaka</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">Explore</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-slate-300">
              <Link href="/" className="transition hover:text-amber-300">Home</Link>
              <Link href="/animals" className="transition hover:text-amber-300">All Animals</Link>
              <Link href="/login" className="transition hover:text-amber-300">Login</Link>
            </div>
            <div className="mt-6 flex gap-3" aria-label="Social links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm transition hover:bg-amber-500 hover:text-slate-950"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-400">
        Copyright 2026 QurbaniHat. All rights reserved.
      </div>
    </footer>
  );
}
