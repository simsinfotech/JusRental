import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Properties — JusRental',
  description: 'Explore 1200+ verified rental properties across North Bangalore. Filter by area, budget, BHK, and more. Zero brokerage.',
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
