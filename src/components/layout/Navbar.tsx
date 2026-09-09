'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
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
            <a href="#" className="flex items-center gap-2 group">
              <Image
                src="/images/logo.png"
                alt="JusRental"
                width={180}
                height={46}
                className={`h-11 w-auto transition-all duration-300 ${
                  scrolled ? '' : 'brightness-0 invert'
                }`}
                priority
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                    scrolled
                      ? 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-black/5'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className={`flex items-center gap-3 ${scrolled ? '' : 'text-white'}`}>
              <ThemeToggle />
              <div className="hidden md:block">
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
                  scrolled
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

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
