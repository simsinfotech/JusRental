import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — JusRental',
  description: 'Get in touch with JusRental for rental enquiries, property listings, and support. Reach us via WhatsApp, email, or phone.',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jusrental.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.jusrental.com/contact' },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
