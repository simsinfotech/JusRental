import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rental Agreement Guide — JusRental',
  description: 'Everything you need to know about rental agreements in Karnataka. Essential clauses, registration process, and FAQ.',
};

export default function RentalAgreementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
