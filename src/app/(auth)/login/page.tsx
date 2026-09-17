'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LuMail, LuLock, LuLogIn, LuCircleAlert } from 'react-icons/lu';
import { createSupabaseBrowser } from '@/lib/supabase-browser';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/owner';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-4">
          <Image src="/images/monogram.png" alt="JusRental" width={48} height={48} />
        </Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-white/60 mt-1">Sign in to your JusRental account</p>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <LuCircleAlert className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-white/80 mb-1.5 block">Email</label>
          <div className="relative">
            <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194]/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white/80 mb-1.5 block">Password</label>
          <div className="relative">
            <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194]/50 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#006194] text-white font-semibold shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
        >
          <LuLogIn className="w-4 h-4" />
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-white/50">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-[#0080c4] hover:text-[#0080c4] font-medium">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
