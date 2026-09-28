import type { Metadata } from 'next';
import Script from 'next/script';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { LayoutShell } from '@/components/layout/LayoutShell';
import './globals.css';

const GTM_ID = 'GTM-P844FG8T';

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
    'Discover 1200+ verified rental properties across 25+ Bangalore neighborhoods. Zero brokerage. Move in hassle-free.',
  keywords: ['Bangalore rentals', 'no brokerage', 'rental homes', 'PG', 'flats for rent'],
  verification: {
    google: 'qP7irCiAqorZ0gTyToUeMxgXwpwsFvfblFjyF7zT9fs',
  },
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider>
          <SmoothScrollProvider>
            <LayoutShell>{children}</LayoutShell>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
