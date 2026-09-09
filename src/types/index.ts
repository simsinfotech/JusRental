export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bhk: number;
  sqft: number;
  furnished: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  images: string[];
  amenities: string[];
  verified: boolean;
  available: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  type: 'text' | 'video';
  videoUrl?: string;
}

export interface Area {
  id: string;
  name: string;
  properties: number;
  priceRange: string;
  image: string;
  popular: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}
