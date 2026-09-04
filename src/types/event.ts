export type EventCategory = 
  | 'all' 
  | 'reiki' 
  | 'meditation' 
  | 'energy' 
  | 'sound' 
  | 'breath' 
  | 'yoga' 
  | 'women_circle';

export type PriceType = 'free' | 'donation' | 'fixed';

export interface Master {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio?: string;
  experienceYears?: number;
  instagram?: string;
  telegram?: string;
}

export interface PreparationTip {
  icon: string;
  text: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  categoryName: string;
  date: string; // readable string like "5 вересня" or ISO
  dateIso?: string; // ISO date YYYY-MM-DD for precise filtering
  time: string; // "20:00 (Київ)"
  durationMinutes: number;
  platform: string; // "Zoom", "YouTube Live", "Google Meet"
  platformUrl?: string; // link to event or registration
  priceType: PriceType;
  priceFormatted: string; // "Вільний донейшн", "Безкоштовно", "450 ₴"
  priceAmount?: number;
  bannerUrl: string;
  description: string;
  programSteps?: string[];
  preparationTips: PreparationTip[];
  master: Master;
  isFeatured?: boolean;
  viewsCount?: number;
}
