import ProfileCard from "@/components/profile/ProfileCard";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "My Profile - QurbaniHat"
};

export default async function MyProfilePage() {
  const session = await requireUser("/login?callbackURL=/my-profile");

  return (
    <section className="container-section py-12 md:py-20">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <p className="badge-market mx-auto w-fit">My Account</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">Buyer Profile</h1>
      </div>
      <ProfileCard user={session.user} />
    </section>
  );
}
