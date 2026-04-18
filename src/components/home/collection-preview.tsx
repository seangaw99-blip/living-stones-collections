import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import { getNewArrivals } from '@/data/queries';

export function CollectionPreview() {
  const specimens = getNewArrivals(3);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-headline text-4xl font-normal text-primary md:text-5xl">
            Featured Specimens
          </h2>
          <Link
            href="/collection"
            className="hidden items-center gap-2 font-body text-sm text-secondary transition-colors hover:text-primary sm:flex"
          >
            <span>View all specimens</span>
            <span className="material-symbols-outlined text-[16px]" aria-hidden>
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {specimens.map((specimen) => (
            <ProductCard key={specimen.slug} specimen={specimen} />
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 font-body text-sm text-secondary transition-colors hover:text-primary"
          >
            <span>View full collection</span>
            <span className="material-symbols-outlined text-[16px]" aria-hidden>
              arrow_forward
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
