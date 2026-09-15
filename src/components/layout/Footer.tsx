'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, MessageCircle, ExternalLink, ShieldCheck, BadgePercent, Clock } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Rental Agreement', href: '/rental-agreement' },
  ],
  tenants: [
    { label: 'Browse Properties', href: '/properties' },
    { label: 'Apartments in Hennur', href: '/properties?area=Hennur' },
    { label: 'Apartments in Hebbal', href: '/properties?area=Hebbal' },
    { label: 'Apartments in Yelahanka', href: '/properties?area=Yelahanka' },
    { label: 'NRI Services', href: '/nri-services' },
  ],
  owners: [
    { label: 'List Your Property', href: '/list-property' },
    { label: 'Rental Estimator', href: '/rent-estimator' },
    { label: 'Owner Tips', href: '/blog' },
    { label: 'NRI Services', href: '/nri-services' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
    { label: 'Zero Brokerage Policy', href: '#' },
  ],
};

const socials = [
  { icon: Globe, href: 'https://estatehive.in', label: 'Website' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp' },
  { icon: ExternalLink, href: 'https://estatehive.in', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="JusRental"
                width={180}
                height={46}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              AI-matched, verified rental homes in Bangalore. Zero tenant brokerage, closing handled for you.
            </p>

            {/* Inline Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-3 h-3" />
                100% Verified
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                <BadgePercent className="w-3 h-3" />
                Zero Brokerage
              </span>
            </div>

            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* For Tenants */}
          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)] text-white">For Tenants</h4>
            <ul className="space-y-2.5">
              {footerLinks.tenants.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)] text-white">For Owners</h4>
            <ul className="space-y-2.5">
              {footerLinks.owners.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)] text-white">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bangalore Hub */}
          <div>
            <h4 className="font-semibold mb-4 font-[family-name:var(--font-heading)] text-white">Bangalore Hub</h4>
            <ul className="space-y-3">
              <li>
                <span className="flex items-start gap-2 text-sm text-white/50">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                  Bengaluru 560077, Karnataka, India
                </span>
              </li>
              <li>
                <a href={WHATSAPP_URL} className="flex items-start gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                  +91 90363 17765
                </a>
              </li>
              <li>
                <a href="mailto:hello@jusrental.com" className="flex items-start gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                  hello@jusrental.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-white/50">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                  Mon - Sat, 9AM - 7PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} JusRental. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
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
