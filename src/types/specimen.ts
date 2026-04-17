export interface Specimen {
  slug: string;
  name: string;
  origin: string;
  weight: string;
  dimensions?: string;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  tags: ('rare' | 'collector-grade' | '1-left')[];
  images: string[];
  description: string;
  formationNotes: string;
  createdAt: string;
}
