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
      {/* Image area — aspect 4:5, warm dim surface bg */}
      <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-xl bg-surface-dim">
        {specimen.images[0] ? (
          <Image
            src={specimen.images[0]}
            alt={`${specimen.name} from ${specimen.origin} — ${specimen.weight} mineral specimen`}
            fill
            className={cn(
              'object-cover transition-transform duration-700 ease-in-out',
              !isSold && 'group-hover:scale-105',
              isSold && 'opacity-50 grayscale'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-surface-container-high" />
          </div>
        )}
      </div>

      {/* Details row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-headline text-2xl font-light text-primary transition-colors duration-300 group-hover:text-secondary">
          {specimen.name}
        </h3>
        {!isSold && (
          <span className="shrink-0 font-body text-[14px] text-primary pt-2">
            &#8369;{specimen.price.toLocaleString()}
          </span>
        )}
      </div>

      <p className="label-text text-outline mb-3">
        {specimen.origin} &middot; {specimen.weight}
      </p>

      {showDescription && (
        <p className="mb-6 font-body text-[14px] leading-[1.7] text-on-surface-variant">
          {specimen.description}
        </p>
      )}

      {/* Tags row */}
      {(specimen.tags.length > 0 || isSold) && (
        <div className="flex flex-wrap gap-2">
          {isSold ? (
            <Tag variant="sold" />
          ) : (
            specimen.tags.map((tag) => <Tag key={tag} variant={tag} />)
          )}
        </div>
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
