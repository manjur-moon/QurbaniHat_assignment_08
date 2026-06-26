import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login - QurbaniHat"
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const callbackURL = params?.callbackURL || "/";

  return (
    <section className="container-section flex min-h-[75vh] items-center justify-center py-12">
      <LoginForm callbackURL={callbackURL} />
    </section>
  );
}
