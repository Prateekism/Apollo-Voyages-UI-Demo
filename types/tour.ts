export interface Tour {
  id: number;
  tourName: string;
  tourUrl: string;
  thumbnailImage: string;
  priceUSD: string | null;
  priceINR: string | null;
  tourType: string | null;
  location: string;
  views?: string | null;
  category: string;
  duration: string;
  fullDescription: string;
  galleryImages: string[];
}