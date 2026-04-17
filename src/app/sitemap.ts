import { MetadataRoute } from 'next';
import { getAllSpecimens, getUniqueOriginCountries } from '@/data/queries';
import { originToSlug } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://livingstonescollections.com';
  const specimens = getAllSpecimens();
  const origins = getUniqueOriginCountries();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/inquire`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sold-archive`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const originRoutes: MetadataRoute.Sitemap = origins.map((country) => ({
    url: `${baseUrl}/collection/origin/${originToSlug(country)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const specimenRoutes: MetadataRoute.Sitemap = specimens.map((s) => ({
    url: `${baseUrl}/collection/${s.slug}`,
    lastModified: new Date(s.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...originRoutes, ...specimenRoutes];
}
