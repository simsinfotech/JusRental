import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Property — JusRental',
  description: 'List your rental property for free on JusRental. Access 5,000+ verified tenants, get tenant KYC, and fast closure in North Bangalore.',
};

export default function ListPropertyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
