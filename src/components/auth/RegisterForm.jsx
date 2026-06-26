"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", image: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        image: formData.image || undefined,
        password: formData.password
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful. Please login now.");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-card w-full max-w-lg p-6 md:p-8">
      <p className="badge-market">Join The Mela</p>
      <h1 className="mt-3 text-3xl font-black text-slate-950">Create Your QurbaniHat Account</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Register to book animals and update your profile.</p>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        <Input label="Photo URL" name="image" type="url" required={false} value={formData.image} onChange={handleChange} placeholder="https://example.com/photo.jpg" />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} minLength={8} placeholder="Minimum 8 characters" />
        <button disabled={loading} className="rounded-2xl bg-amber-500 px-5 py-3 font-black text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <GoogleLoginButton className="mt-4" />

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account? <Link href="/login" className="font-black text-teal-700">Login</Link>
      </p>
    </div>
  );
}

function Input({ label, required = true, ...props }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input {...props} required={required} className="input-soft" />
    </label>
  );
}
