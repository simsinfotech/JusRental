import type { Property, Testimonial, Area, Stat, Step, Feature, NavLink } from '@/types';

export const WHATSAPP_NUMBER = '919876543210';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20renting%20a%20property%20in%20Bangalore`;

export const NAV_LINKS: NavLink[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Properties', href: '#properties' },
  { label: 'Areas', href: '#areas' },
  { label: 'For Owners', href: '#owners' },
  { label: 'Testimonials', href: '#testimonials' },
];

export const STATS: Stat[] = [
  { label: 'Happy Tenants', value: 5000, suffix: '+' },
  { label: 'Verified Properties', value: 1200, suffix: '+' },
  { label: 'Bangalore Areas', value: 25, suffix: '+' },
  { label: 'Satisfaction Rate', value: 98, suffix: '%' },
];

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Tell Us Your Needs',
    description: 'Share your preferences — BHK, budget, location, and move-in date via WhatsApp or our smart filters.',
    icon: 'MessageSquare',
  },
  {
    number: 2,
    title: 'Get Curated Matches',
    description: 'Our AI matches you with verified properties that fit your exact requirements. No spam, no fakes.',
    icon: 'Sparkles',
  },
  {
    number: 3,
    title: 'Schedule Visits',
    description: 'Book property visits at your convenience. We coordinate everything — you just show up.',
    icon: 'CalendarCheck',
  },
  {
    number: 4,
    title: 'Move In Hassle-Free',
    description: 'Sign the agreement, pay securely, and move in. Zero brokerage, zero hidden charges.',
    icon: 'Home',
  },
];

export const FEATURES: Feature[] = [
  {
    title: '100% Verified Listings',
    description: 'Every property is physically verified by our team. Real photos, real details, real availability.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Real-Time Availability',
    description: 'No more calling about properties that are already rented. Our listings update in real-time.',
    icon: 'Radio',
  },
  {
    title: 'Zero Brokerage',
    description: 'Save lakhs on brokerage fees. We connect you directly with property owners at no extra cost.',
    icon: 'BadgeIndianRupee',
  },
];

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern 2BHK in Koramangala',
    location: 'Koramangala 4th Block, Bangalore',
    price: 28000,
    bhk: 2,
    sqft: 1100,
    furnished: 'Furnished',
    images: [
      '/images/property-1.jpg',
      '/images/property-1b.jpg',
    ],
    amenities: ['WiFi', 'Gym', 'Parking', 'Power Backup'],
    verified: true,
    available: true,
  },
  {
    id: '2',
    title: 'Spacious 3BHK in Indiranagar',
    location: '12th Main, Indiranagar, Bangalore',
    price: 45000,
    bhk: 3,
    sqft: 1650,
    furnished: 'Semi-Furnished',
    images: [
      '/images/property-2.jpg',
      '/images/property-2b.jpg',
    ],
    amenities: ['Pool', 'Gym', 'Parking', 'Security'],
    verified: true,
    available: true,
  },
  {
    id: '3',
    title: 'Cozy 1BHK in HSR Layout',
    location: 'HSR Layout Sector 2, Bangalore',
    price: 16000,
    bhk: 1,
    sqft: 650,
    furnished: 'Furnished',
    images: [
      '/images/property-3.jpg',
      '/images/property-3b.jpg',
    ],
    amenities: ['WiFi', 'Power Backup', 'Water Purifier'],
    verified: true,
    available: true,
  },
];

export const AREAS: Area[] = [
  {
    id: '1',
    name: 'Koramangala',
    properties: 240,
    priceRange: '₹15K - ₹60K',
    image: '/images/area-koramangala.png',
    popular: true,
  },
  {
    id: '2',
    name: 'Indiranagar',
    properties: 185,
    priceRange: '₹18K - ₹75K',
    image: '/images/area-indiranagar.png',
    popular: true,
  },
  {
    id: '3',
    name: 'HSR Layout',
    properties: 310,
    priceRange: '₹12K - ₹45K',
    image: '/images/area-hsr.png',
    popular: true,
  },
  {
    id: '4',
    name: 'Whitefield',
    properties: 420,
    priceRange: '₹10K - ₹40K',
    image: '/images/area-whitefield.png',
    popular: false,
  },
  {
    id: '5',
    name: 'Electronic City',
    properties: 290,
    priceRange: '₹8K - ₹30K',
    image: '/images/area-ecity.png',
    popular: false,
  },
  {
    id: '6',
    name: 'Marathahalli',
    properties: 350,
    priceRange: '₹10K - ₹35K',
    image: '/images/area-marathahalli.png',
    popular: false,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ananya Rao',
    role: 'Tenant',
    avatar: '/images/avatar-woman.jpg',
    content: 'I answered four questions on chat and got homes that actually matched my budget. The advisor even negotiated the deposit down by two months.',
    rating: 5,
    type: 'text',
  },
  {
    id: '2',
    name: 'Karthik S.',
    role: 'Tenant',
    avatar: '/images/avatar-man.jpg',
    content: 'I visited two homes and both looked exactly like the photos. No fake listings, no brokers calling at midnight. Just a clean, fast close.',
    rating: 5,
    type: 'text',
  },
  {
    id: '3',
    name: 'Venkatesh R.',
    role: 'Owner',
    avatar: '/images/avatar-owner.jpg',
    content: 'JusRental screened three families in a week. The tenant they found pays on time and treats the place like his own. Worth every rupee.',
    rating: 5,
    type: 'text',
  },
];

export const AMENITY_ICONS: Record<string, string> = {
  WiFi: 'Wifi',
  Gym: 'Dumbbell',
  Parking: 'Car',
  'Power Backup': 'Zap',
  Pool: 'Waves',
  Security: 'Shield',
  'Water Purifier': 'Droplets',
  AC: 'AirVent',
  Lift: 'ArrowUpDown',
};
