import { specimens } from '@/data/specimens';
import type { Specimen } from '@/types/specimen';

export function getAllSpecimens(): Specimen[] {
  return [...specimens].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getAvailableSpecimens(): Specimen[] {
  return getAllSpecimens().filter((s) => s.status === 'available');
}

export function getSoldSpecimens(): Specimen[] {
  return getAllSpecimens().filter((s) => s.status === 'sold');
}

export function getSpecimenBySlug(slug: string): Specimen | undefined {
  return specimens.find((s) => s.slug === slug);
}

export function getSpecimensByOrigin(origin: string): Specimen[] {
  return getAvailableSpecimens().filter((s) =>
    s.origin.toLowerCase().includes(origin.toLowerCase())
  );
}

// Extracts the country from an origin string (e.g., "Capillitas, Argentina" → "Argentina").
function originCountry(origin: string): string {
  return origin.includes(',') ? origin.split(',').pop()!.trim() : origin.trim();
}

export function getUniqueOriginCountries(): string[] {
  const countries = getAllSpecimens().map((s) => originCountry(s.origin));
  return [...new Set(countries)].sort();
}

export function getSpecimensByOriginCountry(country: string): Specimen[] {
  return getAllSpecimens().filter(
    (s) => originCountry(s.origin).toLowerCase() === country.toLowerCase()
  );
}

export function getUniqueOrigins(): string[] {
  const origins = getAvailableSpecimens().map((s) => s.origin);
  return [...new Set(origins)].sort();
}

export function getNewArrivals(count: number): Specimen[] {
  return getAvailableSpecimens().slice(0, count);
}

type PriceRange = 'under-5000' | '5000-15000' | 'over-15000';

function applyPriceFilter(list: Specimen[], price: PriceRange): Specimen[] {
  if (price === 'under-5000') return list.filter((s) => s.price < 5000);
  if (price === '5000-15000')
    return list.filter((s) => s.price >= 5000 && s.price <= 15000);
  if (price === 'over-15000') return list.filter((s) => s.price > 15000);
  return list;
}

export function filterSpecimens(params: {
  origin?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest';
  availability?: 'available' | 'sold';
  price?: PriceRange;
  available?: boolean;
}): Specimen[] {
  const availability =
    params.availability ?? (params.available === false ? undefined : 'available');

  let results =
    availability === 'sold'
      ? getSoldSpecimens()
      : availability === 'available'
        ? getAvailableSpecimens()
        : getAllSpecimens();

  if (params.origin) {
    results = results.filter((s) =>
      s.origin.toLowerCase().includes(params.origin!.toLowerCase())
    );
  }

  if (params.price) {
    results = applyPriceFilter(results, params.price);
  }

  if (params.sort === 'price-asc') {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (params.sort === 'price-desc') {
    results = [...results].sort((a, b) => b.price - a.price);
  }

  return results;
}
