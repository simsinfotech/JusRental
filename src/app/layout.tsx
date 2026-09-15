import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { GTMProvider } from '@/components/providers/GTMProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JusRental — Find Your Perfect Rental Home in Bangalore',
  description:
    'Discover 1200+ verified rental properties across 25+ Bangalore neighborhoods. Zero brokerage. AI-powered matching. Move in hassle-free.',
  keywords: ['Bangalore rentals', 'no brokerage', 'rental homes', 'PG', 'flats for rent'],
  icons: {
    icon: '/images/monogram.png',
    apple: '/images/monogram.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScrollProvider>
            <GTMProvider />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
