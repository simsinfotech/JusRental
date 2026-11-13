'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuLock, LuPhone, LuMessageCircle, LuUser } from 'react-icons/lu';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

interface OwnerDetailsCardProps {
  ownerId: string;
  propertyId: string;
}

interface OwnerProfile {
  name: string;
  phone: string;
}

export function OwnerDetailsCard({ ownerId, propertyId }: OwnerDetailsCardProps) {
  const [state, setState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [owner, setOwner] = useState<OwnerProfile | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowser();

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        setState('unauthenticated');
        return;
      }

      // Authenticated — fetch owner profile
      supabase
        .from('js_user_profiles')
        .select('full_name, phone')
        .eq('id', ownerId)
        .single()
        .then(({ data: profile }) => {
          if (profile) {
            setOwner({ name: profile.full_name ?? 'Property Owner', phone: profile.phone ?? '' });
          }
          setState('authenticated');
        });
    });
  }, [ownerId]);

  if (state === 'loading') {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
        <div className="h-4 bg-slate-100 rounded w-1/2 mb-3" />
        <div className="h-10 bg-slate-100 rounded" />
      </div>
    );
  }

  if (state === 'unauthenticated') {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col items-center text-center gap-2 py-2">
          <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#707881]">
            <LuLock className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-[#131b2e]">Sign in to view owner details</p>
          <p className="text-xs text-[#3f4850]">Contact the property owner directly</p>
          <Link
            href={`/login?redirect=/properties/${propertyId}`}
            className="mt-1 w-full py-2.5 rounded-xl bg-[#006194] text-white text-sm font-semibold text-center hover:bg-[#005080] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Authenticated but no owner profile found
  if (!owner || !owner.phone) {
    return null;
  }

  const initials = owner.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const phoneDigits = owner.phone.replace(/\D/g, '');
  const whatsappPhone = phoneDigits.startsWith('91') ? phoneDigits : `91${phoneDigits}`;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="text-[11px] text-[#3f4850] uppercase font-semibold tracking-wider mb-3">Property Owner</div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] font-semibold text-sm shrink-0">
          {initials || <LuUser className="w-5 h-5" />}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-[#131b2e] truncate">{owner.name}</span>
          <span className="text-xs text-[#3f4850]">{owner.phone}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${owner.phone}`}
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#F1F5F9] text-[#006194] text-sm font-medium hover:bg-slate-200 transition-colors"
        >
          <LuPhone className="w-4 h-4" />
          Call
        </a>
        <a
          href={`https://wa.me/${whatsappPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#DCFCE7] text-[#16A34A] text-sm font-medium hover:bg-[#bbf7d0] transition-colors"
        >
          <LuMessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
