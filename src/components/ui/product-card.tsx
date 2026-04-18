import { cn } from '@/lib/utils';
import { Tag } from '@/components/ui/tag';
import type { Specimen } from '@/types/specimen';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  specimen: Specimen;
  variant?: 'default' | 'sold' | 'editorial';
  showDescription?: boolean;
  className?: string;
}

function CardContent({
  specimen,
  isSold,
  showDescription,
}: {
  specimen: Specimen;
  isSold: boolean;
  showDescription?: boolean;
}) {
  return (
    <>
      {/* Image area — aspect 3:4, taller more dramatic */}
      <div className="relative mb-8 aspect-[3/4] overflow-hidden bg-surface-dim">
        {specimen.images[0] ? (
          <>
            <Image
              src={specimen.images[0]}
              alt={`${specimen.name} from ${specimen.origin} — ${specimen.weight} mineral specimen`}
              fill
              className={cn(
                'object-cover transition-transform duration-[1200ms] ease-out',
                !isSold && 'group-hover:scale-[1.08]',
                isSold && 'opacity-50 grayscale'
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay on hover for depth */}
            {!isSold && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            )}
            {/* Tags float over image */}
            {(specimen.tags.length > 0 || isSold) && (
              <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                {isSold ? (
                  <Tag variant="sold" />
                ) : (
                  specimen.tags.map((tag) => <Tag key={tag} variant={tag} />)
                )}
              </div>
            )}
            {/* Price floats bottom-right */}
            {!isSold && (
              <div className="absolute bottom-4 right-4 bg-background px-4 py-2">
                <span className="font-headline text-lg font-medium text-secondary md:text-xl">
                  &#8369;{specimen.price.toLocaleString()}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-surface-container-high" />
          </div>
        )}
      </div>

      {/* Name — huge display type */}
      <h3 className="font-headline font-medium leading-[0.98] tracking-[-0.02em] text-primary transition-colors duration-300 group-hover:text-secondary text-[clamp(28px,3vw,48px)]">
        {specimen.name}
      </h3>

      <p className="mt-3 font-headline text-lg font-light italic text-primary/70 md:text-xl">
        {specimen.origin}
      </p>

      <p className="mt-1 label-text text-outline tracking-[0.15em]">
        {specimen.weight}
      </p>

      {showDescription && (
        <p className="mt-5 max-w-md font-body text-[15px] leading-[1.7] text-on-surface-variant">
          {specimen.description}
        </p>
      )}
    </>
  );
}

export function ProductCard({
  specimen,
  variant = 'default',
  showDescription = false,
  className,
}: ProductCardProps) {
  const isSold = variant === 'sold' || specimen.status === 'sold';

  if (isSold) {
    return (
      <article
        className={cn('group relative flex flex-col', className)}
        data-reveal
      >
        <CardContent
          specimen={specimen}
          isSold={isSold}
          showDescription={showDescription}
        />
      </article>
    );
  }

  return (
    <Link
      href={`/collection/${specimen.slug}`}
      className={cn('group relative flex flex-col', className)}
      data-reveal
    >
      <CardContent
        specimen={specimen}
        isSold={isSold}
        showDescription={showDescription}
      />
    </Link>
  );
}
