'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/constants';
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

  // Check auth state
  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // On inner pages, always show solid bg
  const showSolidBg = scrolled || !isHome;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolidBg
            ? 'glass shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/logo.png"
                alt="JusRental"
                width={180}
                height={46}
                className={`h-11 w-auto transition-all duration-300 ${
                  showSolidBg ? '' : 'brightness-0 invert'
                }`}
                priority
              />
            </Link>

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
                          ? 'text-blue-600 bg-blue-500/10 font-medium'
                          : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-black/5'
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
            <div className={`flex items-center gap-3 ${showSolidBg ? '' : 'text-white'}`}>
              <div className="hidden md:flex items-center gap-3">
                {isLoggedIn ? (
                  <Link
                    href="/owner"
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      showSolidBg
                        ? 'text-blue-600 hover:bg-blue-500/10'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    My Portal
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      showSolidBg
                        ? 'text-[var(--foreground)] hover:bg-black/5'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    Login
                  </Link>
                )}
                <a
                  href={WHATSAPP_URL}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                </a>
              </div>
              <button
                onClick={() => setMenuOpen(true)}
                className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                  showSolidBg
                    ? 'hover:bg-black/5 text-[var(--foreground)]'
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
