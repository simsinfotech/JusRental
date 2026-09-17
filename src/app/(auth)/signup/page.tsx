'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LuMail, LuLock, LuUser, LuPhone, LuUserPlus, LuCircleAlert, LuCircleCheckBig } from 'react-icons/lu';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          phone: form.phone,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
          <LuCircleCheckBig className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
        <p className="text-white/60 mb-6">
          We&apos;ve sent a confirmation link to <strong className="text-white">{form.email}</strong>.
          Click the link to activate your account.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#006194] text-white font-medium"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-4">
          <Image src="/images/monogram.png" alt="JusRental" width={48} height={48} />
        </Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white">
          Create Account
        </h1>
        <p className="text-sm text-white/60 mt-1">Join JusRental as a property owner</p>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <LuCircleAlert className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-white/80 mb-1.5 block">Full Name *</label>
          <div className="relative">
            <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Your full name"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194]/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white/80 mb-1.5 block">Email *</label>
          <div className="relative">
            <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194]/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white/80 mb-1.5 block">Phone *</label>
          <div className="relative">
            <LuPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194]/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white/80 mb-1.5 block">Password *</label>
          <div className="relative">
            <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 6 characters"
              minLength={6}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194]/50 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#006194] text-white font-semibold shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
        >
          <LuUserPlus className="w-4 h-4" />
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-white/50">
        Already have an account?{' '}
        <Link href="/login" className="text-[#0080c4] hover:text-[#0080c4] font-medium">
          Sign In
        </Link>
      </div>
    </div>
  );
}
