import type { Property, BlogPost, Testimonial, Area, KeyFeature, NRIService } from '@/types';

// Snake_case DB rows → camelCase app types

export interface DbProperty {
  id: string;
  title: string;
  location: string;
  area: string;
  price: number;
  bhk: number;
  sqft: number;
  type: string;
  furnished: string;
  images: string[];
  amenities: string[];
  verified: boolean;
  available: boolean;
  description: string;
  deposit: number;
  floor: string;
  facing: string;
  nearby_places: { name: string; distance: string; type: string }[];
  sharing_type: string;
  posted_date: string;
  owner_id?: string;
  owner_phone?: string;
  slug?: string;
  views_count?: number;
  status?: string;
  verification_fee?: number;
  concierge_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  cover_image: string;
  read_time: number;
  published_date: string;
  published: boolean;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DbTestimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  type: string;
  video_url?: string;
  visible: boolean;
  created_at?: string;
}

export interface DbArea {
  id: string;
  name: string;
  properties_count: number;
  price_range: string;
  image: string;
  popular: boolean;
  created_at?: string;
}

export interface DbKeyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at?: string;
}

export interface DbNRIService {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at?: string;
}

export interface DbRentData {
  id: string;
  area: string;
  bhk: string;
  rent_range: string;
  created_at?: string;
}

export function mapDbProperty(row: DbProperty): Property {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    area: row.area,
    price: row.price,
    bhk: row.bhk,
    sqft: row.sqft,
    type: row.type as Property['type'],
    furnished: row.furnished as Property['furnished'],
    images: row.images || [],
    amenities: row.amenities || [],
    verified: row.verified,
    available: row.available,
    description: row.description,
    deposit: row.deposit,
    floor: row.floor,
    facing: row.facing,
    nearbyPlaces: (row.nearby_places || []).map((p) => ({
      name: p.name,
      distance: p.distance,
      type: p.type as 'school' | 'hospital' | 'metro' | 'mall' | 'park' | 'restaurant',
    })),
    sharingType: row.sharing_type as Property['sharingType'],
    postedDate: row.posted_date,
    verificationFee: row.verification_fee ?? 599,
    concierge: row.concierge_name ?? 'JusRental Team',
  };
}

export function mapDbBlogPost(row: DbBlogPost): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    category: row.category,
    tags: row.tags || [],
    coverImage: row.cover_image,
    readTime: row.read_time,
    publishedDate: row.published_date,
  };
}

export function mapDbTestimonial(row: DbTestimonial): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    avatar: row.avatar,
    content: row.content,
    rating: row.rating,
    type: row.type as 'text' | 'video',
    videoUrl: row.video_url,
  };
}

export function mapDbArea(row: DbArea): Area {
  return {
    id: row.id,
    name: row.name,
    properties: row.properties_count,
    priceRange: row.price_range,
    image: row.image,
    popular: row.popular,
  };
}

export function mapDbKeyFeature(row: DbKeyFeature): KeyFeature {
  return {
    title: row.title,
    description: row.description,
    icon: row.icon,
  };
}

export function mapDbNRIService(row: DbNRIService): NRIService {
  return {
    title: row.title,
    description: row.description,
    icon: row.icon,
  };
}
