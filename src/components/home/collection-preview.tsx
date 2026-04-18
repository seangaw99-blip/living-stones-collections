import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { getNewArrivals } from '@/data/queries';

export function CollectionPreview() {
  const specimens = getNewArrivals(3);
  const [feature, ...rest] = specimens;
  if (!feature) return null;

  return (
    <section className="py-32 md:py-40">
      <Container>
        {/* Section header — asymmetric, giant */}
        <div className="mb-20 grid grid-cols-1 items-end gap-10 md:mb-28 md:grid-cols-2" data-reveal>
          <div>
            <span className="label-text text-secondary tracking-[0.2em]">New arrivals</span>
            <h2 className="mt-6 font-headline font-medium leading-[0.9] tracking-[-0.03em] text-primary text-[clamp(48px,8vw,140px)]">
              Freshly
              <br />
              <span className="italic font-light text-primary/50">quarried.</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-[17px] leading-[1.7] text-on-surface-variant md:justify-self-end md:text-right">
            The newest pieces in the collection. Each one singular, sourced directly from miners and verified dealers worldwide.
          </p>
        </div>

        {/* Hero specimen — dominant full-width feature */}
        <Link
          href={`/collection/${feature.slug}`}
          className="group relative -mx-6 mb-24 block aspect-[16/10] overflow-hidden md:-mx-12 md:mb-32 xl:mx-[calc(50%-50vw)] xl:aspect-[21/9]"
          data-reveal
        >
          <Image
            src={feature.images[0]}
            alt={`${feature.name} from ${feature.origin} — ${feature.weight} mineral specimen`}
            fill
            priority
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Tags top-left */}
          {feature.tags.length > 0 && (
            <div className="absolute top-8 left-8 flex flex-wrap gap-2 md:top-12 md:left-12">
              {feature.tags.map((tag) => <Tag key={tag} variant={tag} />)}
            </div>
          )}

          {/* Big overlay info bottom */}
          <div className="absolute bottom-8 left-8 right-8 md:bottom-14 md:left-16 md:right-16">
            <div className="flex items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="label-text text-on-primary/60 tracking-[0.2em]">Featured</span>
                <h3 className="mt-4 font-headline font-medium leading-[0.95] tracking-[-0.02em] text-on-primary text-[clamp(40px,6vw,96px)]">
                  {feature.name}
                </h3>
                <p className="mt-3 font-headline text-xl font-light italic text-on-primary/80 md:text-2xl">
                  from {feature.origin}
                </p>
              </div>
              <div className="hidden shrink-0 text-right md:block">
                <span className="label-text text-on-primary/60 tracking-[0.2em]">Available</span>
                <p className="mt-2 font-headline text-3xl font-medium text-secondary md:text-4xl">
                  &#8369;{feature.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Two smaller companions */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16" data-reveal>
            {rest.map((specimen) => (
              <Link
                key={specimen.slug}
                href={`/collection/${specimen.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-dim">
                  <Image
                    src={specimen.images[0]}
                    alt={`${specimen.name} from ${specimen.origin}`}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {specimen.tags.length > 0 && (
                    <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                      {specimen.tags.map((tag) => <Tag key={tag} variant={tag} />)}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-headline font-medium leading-[1] tracking-[-0.02em] text-primary transition-colors duration-300 group-hover:text-secondary text-[clamp(24px,2.5vw,36px)]">
                      {specimen.name}
                    </h3>
                    <p className="mt-2 font-headline text-lg font-light italic text-primary/70">
                      {specimen.origin}
                    </p>
                  </div>
                  <span className="shrink-0 font-headline text-xl font-medium text-secondary md:text-2xl">
                    &#8369;{specimen.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 flex justify-center md:mt-28" data-reveal>
          <Link
            href="/collection"
            className="group inline-flex items-center gap-3 border-b-[1px] border-primary pb-2 font-headline text-2xl font-normal italic text-primary transition-colors hover:text-secondary hover:border-secondary md:text-3xl"
          >
            View the full collection
            <span className="material-symbols-outlined text-[24px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              arrow_forward
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
