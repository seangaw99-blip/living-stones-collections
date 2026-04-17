import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import {
  getSpecimensByOriginCountry,
  getUniqueOriginCountries,
} from '@/data/queries';
import { originToSlug, slugToOrigin } from '@/lib/utils';
import type { Metadata } from 'next';

const BASE_URL = 'https://livingstonescollections.com';

interface OriginPageProps {
  params: Promise<{ origin: string }>;
}

export async function generateStaticParams() {
  return getUniqueOriginCountries().map((country) => ({
    origin: originToSlug(country),
  }));
}

export async function generateMetadata({
  params,
}: OriginPageProps): Promise<Metadata> {
  const { origin } = await params;
  const country = slugToOrigin(origin);
  const specimens = getSpecimensByOriginCountry(country);
  if (specimens.length === 0) return {};

  return {
    title: `${country} Mineral Specimens`,
    description: `Rare mineral specimens from ${country} — curated by The Living Stones Collections. Each piece is singular, sourced directly from miners and verified dealers.`,
    alternates: {
      canonical: `/collection/origin/${origin}`,
    },
    openGraph: {
      title: `${country} Mineral Specimens | Living Stones Collections`,
      description: `Rare mineral specimens from ${country}. Each piece is singular and one-of-one.`,
      url: `/collection/origin/${origin}`,
    },
  };
}

export default async function OriginPage({ params }: OriginPageProps) {
  const { origin } = await params;
  const country = slugToOrigin(origin);
  const specimens = getSpecimensByOriginCountry(country);

  if (specimens.length === 0) notFound();

  const available = specimens.filter((s) => s.status === 'available');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Mineral Specimens from ${country}`,
    description: `Rare mineral specimens sourced from ${country}.`,
    url: `${BASE_URL}/collection/origin/${origin}`,
    numberOfItems: specimens.length,
    itemListElement: specimens.map((s, i) => ({
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Collection',
        item: `${BASE_URL}/collection`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: country,
        item: `${BASE_URL}/collection/origin/${origin}`,
      },
    ],
  };

  return (
    <div className="pt-16 pb-24 md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Container>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collection', href: '/collection' },
            { label: country },
          ]}
        />

        <div className="mt-10 mb-16 max-w-3xl">
          <span className="label-text text-outline">Origin</span>
          <h1 className="mt-4 font-headline text-5xl font-light leading-tight tracking-tight text-primary md:text-6xl lg:text-7xl">
            Specimens from {country}.
          </h1>
          <p className="mt-6 max-w-xl font-body text-[15px] leading-[1.8] text-on-surface-variant">
            {specimens.length} piece{specimens.length !== 1 ? 's' : ''} sourced
            from {country}. Each is documented with its mine, weight, and
            formation notes &mdash; and when it sells, it is gone.
          </p>
          <div className="mt-8">
            <Link
              href="/collection"
              className="label-text text-secondary underline-offset-4 decoration-[0.5px] hover:underline"
            >
              View the full collection
            </Link>
          </div>
        </div>

        <section
          aria-label={`Mineral specimens from ${country}`}
          className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {available.map((specimen) => (
            <ProductCard key={specimen.slug} specimen={specimen} />
          ))}
        </section>
      </Container>
    </div>
  );
}
