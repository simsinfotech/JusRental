'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, MapPin, Search, Home } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const showSolidBg = scrolled || !isHome;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolidBg
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + Location */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/images/logo.png"
                  alt="JusRental"
                  width={180}
                  height={46}
                  className={`h-10 w-auto transition-all duration-300 ${
                    showSolidBg ? '' : 'brightness-0 invert'
                  }`}
                  priority
                />
              </Link>
              {/* Bangalore Badge */}
              <span className={`hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                showSolidBg
                  ? 'bg-slate-50 text-[#3f4850] border-slate-200'
                  : 'bg-white/10 text-white/80 border-white/15'
              }`}>
                <MapPin className="w-3 h-3" />
                Bangalore
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                      showSolidBg
                        ? isActive
                          ? 'text-[#006194] bg-[#006194]/10 font-medium'
                          : 'text-[#3f4850] hover:text-[#131b2e] hover:bg-slate-50'
                        : isActive
                          ? 'text-white bg-white/15 font-medium'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search placeholder */}
              <button className={`hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors cursor-pointer ${
                showSolidBg
                  ? 'border-slate-200 text-[#707881] hover:bg-slate-50'
                  : 'border-white/15 text-white/60 hover:bg-white/10'
              }`}>
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
              </button>

              <div className="hidden md:flex items-center gap-2">
                {/* List Property */}
                <Link
                  href="/list-property"
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    showSolidBg
                      ? 'bg-[#006194] text-white hover:bg-[#005080]'
                      : 'bg-white text-[#006194] hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  List Property
                </Link>

                {/* User Avatar/Login */}
                {isLoggedIn ? (
                  <Link
                    href="/owner"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      showSolidBg
                        ? 'bg-[#006194]/10 text-[#006194] hover:bg-[#006194]/20'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <User className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      showSolidBg
                        ? 'bg-slate-100 text-[#3f4850] hover:bg-slate-200'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                  showSolidBg
                    ? 'hover:bg-slate-50 text-[#131b2e]'
                    : 'hover:bg-white/10 text-white'
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isLoggedIn={isLoggedIn} />
    </>
  );
}
