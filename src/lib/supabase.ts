import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using fallback mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Типы для базы данных
export type AppRole = 'admin' | 'moderator' | 'user';

export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface SiteSection {
  id: string;
  name: string;
  content: Record<string, any>;
  is_visible: boolean;
  updated_at: string;
  updated_by?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  scroll_to?: string;
  position: number;
  is_visible: boolean;
  location: string;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, any>;
  updated_at: string;
}

export interface Review {
  id: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
  excerpt: string;
  cover_color: string;
  cover_image_url?: string;
  full_review: string;
  published_date: string;
  is_published: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  review_id: string;
  user_id: string;
  user_name: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}
