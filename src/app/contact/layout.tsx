import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — JusRental',
  description: 'Get in touch with JusRental for rental enquiries, property listings, and support. Reach us via WhatsApp, email, or phone.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
