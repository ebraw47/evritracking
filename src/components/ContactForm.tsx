'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRAND } from '@/lib/siteConfig';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Contact from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    reset();
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <h2 className="font-display text-2xl font-bold text-ink text-center mb-6">Send Us a Message</h2>

      {formSubmitted ? (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-800">
          Thanks! Your email client should open shortly. We typically reply within 24–48 hours.
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-ink focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email*
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-ink focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
            Message*
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-ink focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-brand py-3.5 font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
