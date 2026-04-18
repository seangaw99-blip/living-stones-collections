import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import { getSoldSpecimens } from '@/data/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sold Archive',
  description:
    'A record of past mineral specimens from The Living Stones Collections. Browse previously held pieces to understand the range and quality of what we carry.',
  alternates: {
    canonical: '/sold-archive',
  },
  openGraph: {
    title: 'Sold Archive | The Living Stones Collections',
    description:
      'Previously held mineral specimens — shown as a reference for the range and quality of the collection.',
    url: '/sold-archive',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SoldArchivePage() {
  const sold = getSoldSpecimens();

  return (
    <div className="pt-16 pb-24 md:pt-24">
      <Container>
        <div className="mb-16">
          <span className="label-text text-secondary">Archive</span>
          <h1 className="mt-4 font-headline text-5xl font-normal leading-tight tracking-tight text-primary md:text-7xl">
            Previously held.
          </h1>
          <p className="mt-4 max-w-md font-body text-[15px] leading-[1.7] text-on-surface-variant">
            A record of past pieces. These are no longer available &mdash; shown
            here as a reference for the range and quality of the collection.
          </p>
        </div>

        {sold.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {sold.map((specimen) => (
              <ProductCard
                key={specimen.slug}
                specimen={specimen}
                variant="sold"
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-headline text-2xl font-normal text-on-surface-variant/70">
              No archived pieces yet.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
