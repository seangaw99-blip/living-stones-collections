import type { Specimen } from '@/types/specimen';
import { getSpecimenBySlug } from '@/data/queries';

export interface FeaturedHeroStop {
  specimen: Specimen;
  heroImage: string;
  accentHex: string;
  accentLabel: string;
}

const STOPS: Array<Omit<FeaturedHeroStop, 'specimen'> & { slug: string }> = [
  {
    slug: 'amethyst-cathedral-uruguay',
    heroImage: '/specimens/hero-amethyst.png',
    accentHex: '#5B3A88',
    accentLabel: 'Violet',
  },
  {
    slug: 'azurite-nodule-morocco',
    heroImage: '/specimens/hero-azurite.png',
    accentHex: '#1E4A8C',
    accentLabel: 'Cobalt',
  },
  {
    slug: 'rhodochrosite-stalactite-argentina',
    heroImage: '/specimens/hero-rhodochrosite.png',
    accentHex: '#A84562',
    accentLabel: 'Rose',
  },
  {
    slug: 'malachite-cluster-congo',
    heroImage: '/specimens/hero-malachite.png',
    accentHex: '#2F6B4A',
    accentLabel: 'Jade',
  },
  {
    slug: 'celestite-cluster-madagascar',
    heroImage: '/specimens/hero-celestite.png',
    accentHex: '#6A8BB3',
    accentLabel: 'Sky',
  },
  {
    slug: 'pyrite-sun-peru',
    heroImage: '/specimens/hero-pyrite.png',
    accentHex: '#8C6B2F',
    accentLabel: 'Brass',
  },
];

export function getFeaturedHeroStops(): FeaturedHeroStop[] {
  return STOPS.flatMap((entry) => {
    const specimen = getSpecimenBySlug(entry.slug);
    if (!specimen) return [];
    return [
      {
        specimen,
        heroImage: entry.heroImage,
        accentHex: entry.accentHex,
        accentLabel: entry.accentLabel,
      },
    ];
  });
}
