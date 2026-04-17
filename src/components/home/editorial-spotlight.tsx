import Image from 'next/image';
import Link from 'next/link';
import { getSpecimenBySlug } from '@/data/queries';

// The one specimen that gets the magazine-cover treatment.
// Swap this slug to rotate the featured piece.
const FEATURED_SLUG = 'rhodochrosite-stalactite-argentina';

const CURATORS_NOTE =
  'A cross-section through a growth cone from the Capillitas mine, deep in the Andes. Rhodochrosite forms in hydrothermal seams over hundreds of thousands of years — each concentric band marks a distinct growth period. You can count them like tree rings.';

export function EditorialSpotlight() {
  const specimen = getSpecimenBySlug(FEATURED_SLUG);
  if (!specimen) return null;

  return (
    <section className="bg-primary-container text-on-primary py-20 md:py-28">
      {/* Full-bleed grid — image left, text right */}
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.7fr_1fr]">
        {/* Image — edge-to-edge on the left */}
        <div
          className="relative aspect-[4/5] w-full bg-surface-dim lg:aspect-auto lg:min-h-[720px]"
          data-reveal
        >
          <Image
            src={specimen.images[0]}
            alt={`${specimen.name} from ${specimen.origin} — mineral specimen`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 62vw"
          />
          {/* Specimen badge overlay — bottom-left */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-surface-container-highest/95 px-3 py-1.5 hairline md:bottom-10 md:left-10">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="label-text text-primary">
              {specimen.origin}
            </span>
          </div>
        </div>

        {/* Text — dark gallery wall */}
        <div
          className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-20 lg:px-16 xl:px-24"
          data-reveal
        >
          <span className="label-text text-secondary">In focus</span>

          <h2 className="mt-5 font-headline text-4xl font-light leading-[1.05] tracking-tight text-on-primary md:text-5xl lg:text-[clamp(40px,4.2vw,72px)]">
            {specimen.name}.
          </h2>

          <p className="mt-8 max-w-md font-body text-[15px] leading-[1.85] text-on-primary/70">
            {CURATORS_NOTE}
          </p>

          {/* Provenance + specs — hairline dividers in white/15 */}
          <dl className="mt-10 flex max-w-sm flex-col gap-5">
            <div className="flex items-baseline gap-5 border-t-[0.5px] border-on-primary/15 pt-5">
              <dt className="label-text w-28 shrink-0 text-on-primary/50">
                Origin
              </dt>
              <dd className="font-headline text-base font-light italic text-on-primary">
                {specimen.origin}
              </dd>
            </div>
            <div className="flex items-baseline gap-5 border-t-[0.5px] border-on-primary/15 pt-5">
              <dt className="label-text w-28 shrink-0 text-on-primary/50">
                Weight
              </dt>
              <dd className="font-body text-[14px] text-on-primary/85">
                {specimen.weight}
              </dd>
            </div>
            {specimen.dimensions && (
              <div className="flex items-baseline gap-5 border-t-[0.5px] border-on-primary/15 pt-5">
                <dt className="label-text w-28 shrink-0 text-on-primary/50">
                  Dimensions
                </dt>
                <dd className="font-body text-[14px] text-on-primary/85">
                  {specimen.dimensions}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-10">
            <Link
              href={`/collection/${specimen.slug}`}
              aria-label={`Read the full story of ${specimen.name} from ${specimen.origin}`}
              className="group inline-flex items-center gap-3 font-body text-[14px] text-on-primary underline decoration-[0.5px] decoration-on-primary/50 underline-offset-[6px] transition-colors hover:text-secondary hover:decoration-secondary"
            >
              Read the full story
              <span
                className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
