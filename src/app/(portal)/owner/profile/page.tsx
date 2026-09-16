'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Save, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function OwnerProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    isNri: false,
  });

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load profile
      const { data: profile } = await supabase
        .from('js_user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setForm({
        fullName: profile?.full_name || user.user_metadata?.full_name || '',
        phone: profile?.phone || '',
        email: user.email || '',
        isNri: profile?.is_nri || false,
      });

      setFetching(false);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const supabase = createSupabaseBrowser();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('js_user_profiles')
      .upsert({
        id: user.id,
        full_name: form.fullName,
        phone: form.phone,
        is_nri: form.isNri,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      // Also update auth metadata
      await supabase.auth.updateUser({
        data: { full_name: form.fullName },
      });
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      router.refresh();
    }

    setLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (passwords.newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setChangingPassword(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.updateUser({
      password: passwords.newPassword,
    });

    if (error) {
      setPasswordMsg({ type: 'error', text: error.message });
    } else {
      setPasswordMsg({ type: 'success', text: 'Password changed successfully.' });
      setPasswords({ newPassword: '', confirmPassword: '' });
    }

    setChangingPassword(false);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <User className="w-6 h-6 text-[#006194]" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">My Profile</h1>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <GlassCard hover={false} className="mb-6">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
            Personal Information
          </h2>

          {message && (
            <div className={`mb-4 flex items-center gap-2 p-3 rounded-xl text-sm ${
              message.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'
            }`}>
              {message.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-[var(--muted)] mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isNri}
                  onChange={(e) => setForm({ ...form, isNri: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium">I am an NRI (Non-Resident Indian)</span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#006194] text-white font-semibold cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </GlassCard>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePasswordChange}>
        <GlassCard hover={false}>
          <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </h2>

          {passwordMsg && (
            <div className={`mb-4 flex items-center gap-2 p-3 rounded-xl text-sm ${
              passwordMsg.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'
            }`}>
              {passwordMsg.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
              {passwordMsg.text}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">New Password</label>
                <input
                  type="password"
                  required
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                  minLength={6}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={changingPassword}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-surface-light border border-glass-border font-semibold cursor-pointer disabled:opacity-50 hover:bg-surface transition-all"
              >
                <Lock className="w-4 h-4" />
                {changingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </GlassCard>
      </form>
    </div>
  );
}
