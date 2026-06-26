"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function BookingForm({ user, animalName }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all booking fields");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success(`Booking request sent for ${animalName}`);
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: ""
      });
      setSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="market-card p-6 md:p-8">
      <p className="badge-market">Booking Desk</p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">Reserve Your Animal</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">Submit your contact details. This demo will not save data in DB or localStorage.</p>

      <div className="mt-6 grid gap-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email" />
        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="017XXXXXXXX" />
        <label className="grid gap-2 text-sm font-black text-slate-700">
          Address
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Your full address"
            className="input-soft"
          />
        </label>
      </div>

      <button disabled={submitting} className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Submitting..." : "Place Booking"}
      </button>
    </form>
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
