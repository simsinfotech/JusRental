export interface Property {
  id: string;
  title: string;
  location: string;
  area: string;
  price: number;
  bhk: number;
  sqft: number;
  type: 'Apartment' | 'Villa' | 'Independent House';
  furnished: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  images: string[];
  amenities: string[];
  verified: boolean;
  available: boolean;
  description: string;
  deposit: number;
  floor: string;
  facing: string;
  nearbyPlaces: NearbyPlace[];
  sharingType: 'Family' | 'Bachelor' | 'Any';
  postedDate: string;
}

export interface NearbyPlace {
  name: string;
  distance: string;
  type: 'school' | 'hospital' | 'metro' | 'mall' | 'park' | 'restaurant';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  publishedDate: string;
}

export interface BookVisitFormData {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  propertyId?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface PropertyFilters {
  type?: string;
  bhk?: string;
  budgetMin?: number;
  budgetMax?: number;
  area?: string;
  furnished?: string;
  sort?: string;
}

export interface KeyFeature {
  title: string;
  description: string;
  icon: string;
}

export interface NRIService {
  title: string;
  description: string;
  icon: string;
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
