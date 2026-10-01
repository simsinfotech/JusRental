import type { Metadata } from 'next';
import Script from 'next/script';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { LayoutShell } from '@/components/layout/LayoutShell';
import './globals.css';

const GTM_ID = 'GTM-P844FG8T';
const GA_ID = 'G-GBHPMM96ZC';

// Single font — Plus Jakarta Sans covers all weights we need.
// Removing Inter saves ~80KB of font download.
const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JusRental — Find Your Perfect Rental Home in Bangalore',
  description:
    'Discover 1200+ verified rental properties across 25+ Bangalore neighborhoods. Zero brokerage. Move in hassle-free.',
  keywords: ['Bangalore rentals', 'no brokerage', 'rental homes', 'PG', 'flats for rent'],
  metadataBase: new URL('https://www.jusrental.com'),
  openGraph: {
    type: 'website',
    siteName: 'JusRental',
    title: 'JusRental — Find Your Perfect Rental Home in Bangalore',
    description: 'Discover 1200+ verified rental properties across 25+ Bangalore neighborhoods. Zero brokerage. Move in hassle-free.',
    url: 'https://www.jusrental.com',
    images: [{ url: '/images/hero-bg.webp', width: 1200, height: 630, alt: 'JusRental — Rental Homes in Bangalore' }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JusRental — Find Your Perfect Rental Home in Bangalore',
    description: 'Discover 1200+ verified rental properties across 25+ Bangalore neighborhoods. Zero brokerage.',
    images: ['/images/hero-bg.webp'],
  },
  other: {
    'fb:page': 'https://www.facebook.com/profile.php?id=61594353013446',
  },
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
      className={`${plusJakarta.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* DNS prefetch for Supabase API */}
        <link rel="dns-prefetch" href="https://zuiacgsbkdgdpoxtgkuz.supabase.co" />
        <link rel="preconnect" href="https://zuiacgsbkdgdpoxtgkuz.supabase.co" />
        {/* Google Tag Manager — deferred to reduce main thread work */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Google Analytics 4 (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script
          id="ga4-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        {/* Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'JusRental',
                url: 'https://www.jusrental.com',
                logo: 'https://www.jusrental.com/images/monogram.png',
                sameAs: [
                  'https://www.facebook.com/profile.php?id=61594353013446',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+91-90363-17765',
                  contactType: 'customer service',
                  areaServed: 'IN',
                  availableLanguage: ['English', 'Hindi', 'Kannada'],
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'JusRental',
                url: 'https://www.jusrental.com',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://www.jusrental.com/properties?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
            ]),
          }}
        />
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
