"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ user }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    image: user?.image || ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image || undefined
      });

      if (error) {
        toast.error(error.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully");
      router.push("/my-profile");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-card w-full max-w-lg p-6 md:p-8">
      <p className="badge-market">Profile Settings</p>
      <h1 className="mt-3 text-3xl font-black text-slate-950">Update Information</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Update your profile name and image URL using Better Auth updateUser.</p>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
        <Input label="Image URL" name="image" type="url" required={false} value={formData.image} onChange={handleChange} placeholder="https://example.com/photo.jpg" />
        <button disabled={loading} className="rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Updating..." : "Update Information"}
        </button>
      </form>
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
