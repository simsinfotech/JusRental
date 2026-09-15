import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Property Visit — JusRental',
  description: 'Schedule a visit to your preferred rental property in Bangalore. We coordinate everything — you just show up.',
};

export default function BookVisitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
