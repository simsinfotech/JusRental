import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NRI Property Management — JusRental',
  description: 'Complete end-to-end property management for NRI owners in Bangalore. Tenant discovery, rent collection, maintenance, and more.',
};

export default function NRIServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
