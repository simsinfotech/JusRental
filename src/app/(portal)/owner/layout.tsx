'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard, Home, Calendar, FileText, User, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

const sidebarLinks = [
  { href: '/owner', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/owner/properties', label: 'My Properties', icon: Home },
  { href: '/owner/visits', label: 'Visit Requests', icon: Calendar },
  { href: '/owner/agreement', label: 'Agreements', icon: FileText },
  { href: '/owner/profile', label: 'Profile', icon: User },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserName(data.user.user_metadata?.full_name || data.user.email || '');
      }
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-glass-border">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-surface-light cursor-pointer">
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/monogram.png" alt="JusRental" width={28} height={28} />
          <span className="font-semibold font-[family-name:var(--font-heading)]">Owner Portal</span>
        </Link>
        <div className="w-9" />
      </div>

      <div className="flex">
        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-screen w-64 bg-surface border-r border-glass-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 flex items-center justify-between border-b border-glass-border">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/monogram.png" alt="JusRental" width={32} height={32} />
              <span className="font-semibold font-[family-name:var(--font-heading)]">Owner Portal</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-surface-light cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 py-4 px-3 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/owner' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#006194]/10 text-[#006194] border border-[#006194]/20'
                      : 'text-[var(--muted)] hover:bg-surface-light hover:text-[var(--foreground)]'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-glass-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white text-sm font-bold">
                {userName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName || 'User'}</p>
                <p className="text-xs text-[var(--muted)]">Owner</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen lg:min-h-[calc(100vh-0px)]">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
