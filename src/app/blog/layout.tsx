import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Guides — JusRental',
  description: 'Expert rental tips, area guides, legal advice, and moving guides for tenants and property owners in Bangalore.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
