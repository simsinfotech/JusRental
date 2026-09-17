'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith('/admin') || pathname.startsWith('/owner');

  return (
    <>
      {!isPortal && <Navbar />}
      <main>{children}</main>
      {!isPortal && <Footer />}
    </>
  );
}
