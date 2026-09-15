import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent Estimator — JusRental',
  description: 'Get accurate rental estimates for properties across all North Bangalore areas. Updated 2026 market rates for 1BHK, 2BHK, and 3BHK.',
};

export default function RentEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
