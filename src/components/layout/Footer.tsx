'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, MessageCircle, ExternalLink, Share2 } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const footerLinks = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  tenants: [
    { label: 'Browse Properties', href: '#properties' },
    { label: 'Explore Areas', href: '#areas' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQs', href: '#' },
  ],
  owners: [
    { label: 'List Your Property', href: '#owners' },
    { label: 'Owner Dashboard', href: '#' },
    { label: 'Rental Estimator', href: '#owners' },
    { label: 'Owner FAQs', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socials = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  { icon: ExternalLink, href: '#', label: 'LinkedIn' },
  { icon: Share2, href: '#', label: 'Share' },
];

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="JusRental"
                width={180}
                height={46}
                className="h-11 w-auto"
              />
            </a>
            <p className="text-sm text-[var(--muted)] mb-4">
              AI-matched, verified rental homes in Bangalore. Zero tenant brokerage, closing handled for you.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-surface-light hover:bg-blue-500/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)]">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)]">For Tenants</h4>
            <ul className="space-y-2">
              {footerLinks.tenants.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)]">For Owners</h4>
            <ul className="space-y-2">
              {footerLinks.owners.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)]">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={WHATSAPP_URL} className="flex items-start gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  +91 90363 17765
                </a>
              </li>
              <li>
                <a href="mailto:hello@jusrental.com" className="flex items-start gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  hello@jusrental.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-[var(--muted)]">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  Bengaluru 560077, Karnataka, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            &copy; {new Date().getFullYear()} JusRental. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
