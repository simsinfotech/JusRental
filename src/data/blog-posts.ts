import type { BlogPost } from '@/types';

export const BLOG_CATEGORIES = [
  'All',
  'Rental Tips',
  'Area Guides',
  'Legal Advice',
  'Moving Guide',
  'Owner Tips',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'complete-guide-renting-hennur-2026',
    title: 'Complete Guide to Renting in Hennur: Prices, Localities & Insider Tips',
    excerpt: 'Hennur has become one of North Bangalore\'s most sought-after rental corridors. This guide covers current rental prices, top apartment complexes, connectivity, and practical tips for tenants in 2026.',
    content: '',
    author: 'JusRental Team',
    category: 'Area Guides',
    tags: ['Hennur', 'North Bangalore', 'Rental Guide', 'Area Guide', 'Manyata Tech Park'],
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    readTime: 8,
    publishedDate: '2026-09-20',
  },
  {
    slug: 'tenant-rights-karnataka-rental-agreement-guide',
    title: 'Tenant Rights in Karnataka: Essential Clauses Every Rental Agreement Must Have',
    excerpt: 'Karnataka\'s rental laws protect tenants more than most realize. Learn which clauses are legally required, how to handle deposit disputes, and what landlords cannot do.',
    content: '',
    author: 'JusRental Team',
    category: 'Legal Advice',
    tags: ['Rental Agreement', 'Tenant Rights', 'Karnataka Law', 'Security Deposit', 'Legal Guide'],
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    readTime: 10,
    publishedDate: '2026-09-15',
  },
  {
    slug: 'zero-brokerage-rentals-how-jusrental-works',
    title: 'How Zero-Brokerage Rentals Work: The JusRental Model Explained',
    excerpt: 'Traditional brokers charge one month\'s rent as commission. Here is how JusRental\'s flat-fee model works, what is included, and why thousands of Bangalore tenants are making the switch.',
    content: '',
    author: 'JusRental Team',
    category: 'Rental Tips',
    tags: ['Zero Brokerage', 'How It Works', 'Save Money', 'Bangalore Rentals'],
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    readTime: 7,
    publishedDate: '2026-09-10',
  },
  {
    slug: 'relocating-to-bangalore-complete-checklist',
    title: 'Relocating to Bangalore? A Practical Checklist for 2026',
    excerpt: 'Moving to Bangalore for work or studies? This step-by-step checklist covers everything from choosing the right neighborhood and setting a budget to setting up utilities and settling in.',
    content: '',
    author: 'JusRental Team',
    category: 'Moving Guide',
    tags: ['Relocation', 'Bangalore', 'Moving Checklist', 'New to Bangalore', 'IT Professionals'],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    readTime: 9,
    publishedDate: '2026-09-05',
  },
  {
    slug: 'maximize-rental-income-north-bangalore-owners',
    title: 'Property Owners: How to Maximize Rental Income in North Bangalore',
    excerpt: 'North Bangalore\'s rental market is booming, but not all properties perform equally. Learn pricing strategies, tenant-attracting upgrades, and tax-saving tips for property owners.',
    content: '',
    author: 'JusRental Team',
    category: 'Owner Tips',
    tags: ['Property Owners', 'Rental Income', 'North Bangalore', 'Tax Savings', 'Investment'],
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    readTime: 9,
    publishedDate: '2026-08-28',
  },
  {
    slug: 'security-deposit-bangalore-how-much-negotiate',
    title: 'Security Deposit in Bangalore: How Much Is Fair and How to Negotiate',
    excerpt: 'Bangalore is notorious for high security deposits — often 10 months\' rent. Here is why deposits are so high, what the law says, and proven strategies to negotiate a lower amount.',
    content: '',
    author: 'JusRental Team',
    category: 'Rental Tips',
    tags: ['Security Deposit', 'Negotiation', 'Bangalore Rentals', 'Tenant Tips', 'Money Saving'],
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    readTime: 9,
    publishedDate: '2026-08-20',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return BLOG_POSTS;
  return BLOG_POSTS.filter((p) => p.category === category);
}
