import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Update Profile - QurbaniHat"
};

export default async function UpdateProfilePage() {
  const session = await requireUser("/login?callbackURL=/my-profile/update");

  return (
    <section className="container-section flex min-h-[70vh] items-center justify-center py-12">
      <UpdateProfileForm user={session.user} />
    </section>
  );
}
