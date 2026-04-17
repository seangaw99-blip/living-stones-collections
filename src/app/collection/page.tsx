import { Suspense } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/product-card';
import { FilterSidebar } from '@/components/collection/filter-sidebar';
import { filterSpecimens, getAvailableSpecimens, getUniqueOrigins } from '@/data/queries';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mineral Specimens for Sale',
  description:
    'Browse our curated collection of rare mineral specimens — rhodochrosite, celestite, azurite, malachite, amethyst, and pyrite. Each piece is singular and one-of-one.',
  alternates: {
    canonical: '/collection',
  },
  openGraph: {
    title: 'Mineral Specimens for Sale | The Living Stones Collections',
    description:
      'Browse rare mineral specimens sourced from six origins worldwide. One-of-one pieces for serious collectors.',
    url: '/collection',
  },
};

interface CollectionPageProps {
  searchParams: Promise<{
    origin?: string;
    sort?: string;
    price?: string;
    availability?: string;
  }>;
}

const BASE_URL = 'https://livingstonescollections.com';

export default async function CollectionPage({
  searchParams,
}: CollectionPageProps) {
  const params = await searchParams;
  const origins = getUniqueOrigins();
  const allAvailable = getAvailableSpecimens();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mineral Specimens for Sale',
    description: 'Curated rare mineral specimens from The Living Stones Collections.',
    url: `${BASE_URL}/collection`,
    numberOfItems: allAvailable.length,
    itemListElement: allAvailable.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}/collection/${s.slug}`,
      name: s.name,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Collection', item: `${BASE_URL}/collection` },
    ],
  };

  const specimens = filterSpecimens({
    origin: params.origin,
    sort: params.sort as 'price-asc' | 'price-desc' | 'newest' | undefined,
    price: params.price as 'under-5000' | '5000-15000' | 'over-15000' | undefined,
    availability:
      (params.availability as 'available' | 'sold' | undefined) ?? 'available',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Page Header */}
      <header className="mx-auto w-full max-w-screen-2xl px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16">
        <h1 className="font-headline text-5xl font-light tracking-tight text-primary md:text-7xl">
          The Collection
        </h1>
        <p className="mt-6 max-w-xl font-body text-[15px] leading-[1.7] text-on-surface-variant">
          {specimens.length} rare mineral specimen
          {specimens.length !== 1 ? 's' : ''} available now &mdash; sourced from
          six origins worldwide and curated for serious collectors. Each piece
          is singular; when it sells, it is gone.
        </p>
        {origins.length > 0 && (
          <nav
            aria-label="Browse by origin"
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
          >
            <span className="label-text text-outline">Browse by origin:</span>
            {[...new Set(origins.map((o) => (o.includes(',') ? o.split(',').pop()!.trim() : o)))]
              .sort()
              .map((country) => (
                <Link
                  key={country}
                  href={`/collection/origin/${country.toLowerCase().replace(/\s+/g, '-')}`}
                  className="label-text text-secondary underline-offset-4 decoration-[0.5px] hover:underline"
                >
                  {country}
                </Link>
              ))}
          </nav>
        )}
      </header>

      {/* Main Grid */}
      <main className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-6 pb-32 md:px-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <Suspense>
            <FilterSidebar origins={origins} />
          </Suspense>
        </div>

        <section className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 lg:col-span-9">
          {specimens.length > 0 ? (
            specimens.map((specimen, i) => (
              <div
                key={specimen.slug}
                className={cn(i % 2 === 1 && 'md:pt-16 lg:pt-24')}
              >
                <ProductCard specimen={specimen} showDescription />
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="font-headline text-2xl font-light text-on-surface-variant">
                No specimens match your filters.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
