import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register - QurbaniHat"
};

export default function RegisterPage() {
  return (
    <section className="container-section flex min-h-[75vh] items-center justify-center py-12">
      <RegisterForm />
    </section>
  );
}
