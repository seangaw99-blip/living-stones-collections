import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Extracts the country from a full origin string and slugifies it.
// "Capillitas, Argentina" → "argentina"
// "Madagascar" → "madagascar"
export function originToSlug(origin: string): string {
  const country = origin.includes(',')
    ? origin.split(',').pop()!.trim()
    : origin.trim();
  return country
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function slugToOrigin(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
