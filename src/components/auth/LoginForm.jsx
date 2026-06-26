"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { authClient } from "@/lib/auth-client";

export default function LoginForm({ callbackURL = "/" }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const safeCallbackURL = callbackURL?.startsWith("/") ? callbackURL : "/";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login successful");
      router.push(safeCallbackURL);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-card w-full max-w-md p-6 md:p-8">
      <p className="badge-market">Welcome Back</p>
      <h1 className="mt-3 text-3xl font-black text-slate-950">Login to QurbaniHat</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Login to book animals and manage your mela profile.</p>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} minLength={8} placeholder="Minimum 8 characters" />
        <button disabled={loading} className="rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <GoogleLoginButton className="mt-4" callbackURL={safeCallbackURL} />

      <p className="mt-6 text-center text-sm text-slate-600">
        New here? <Link href="/register" className="font-black text-teal-700">Create an account</Link>
      </p>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input {...props} required className="input-soft" />
    </label>
  );
}
