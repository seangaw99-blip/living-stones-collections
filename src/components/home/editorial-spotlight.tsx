import Image from 'next/image';
import Link from 'next/link';
import { getSpecimenBySlug } from '@/data/queries';

const FEATURED_SLUG = 'rhodochrosite-stalactite-argentina';

const CURATORS_NOTE =
  'A cross-section through a growth cone from the Capillitas mine, deep in the Andes. Rhodochrosite forms in hydrothermal seams over hundreds of thousands of years — each concentric band marks a distinct growth period. You can count them like tree rings.';

export function EditorialSpotlight() {
  const specimen = getSpecimenBySlug(FEATURED_SLUG);
  if (!specimen) return null;

  return (
    <section className="relative bg-primary-container text-on-primary">
      {/* Section eyebrow + massive title — full-bleed centered across the top */}
      <div className="relative z-10 px-6 pt-24 md:px-12 md:pt-40">
        <div className="mx-auto max-w-screen-2xl">
          <span className="label-text text-secondary tracking-[0.2em]">In focus</span>
          <h2 className="mt-8 font-headline font-medium leading-[0.88] tracking-[-0.035em] text-on-primary text-[clamp(64px,12vw,260px)]">
            {specimen.name.split(' ')[0]}.
          </h2>
          <p className="mt-8 max-w-md font-headline text-2xl font-light italic text-on-primary/60 md:text-3xl">
            {specimen.name.split(' ').slice(1).join(' ')}, from {specimen.origin}
          </p>
        </div>
      </div>

      {/* Full-bleed image + floating content card */}
      <div className="relative mt-16 md:mt-24">
        {/* Image — edge to edge, very tall */}
        <div className="relative aspect-[16/10] w-full bg-surface-dim md:aspect-[21/9] lg:aspect-[2.4/1]" data-reveal>
          <Image
            src={specimen.images[0]}
            alt={`${specimen.name} from ${specimen.origin} — mineral specimen`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/30 to-transparent" />
        </div>

        {/* Content — overlaps image from below */}
        <div className="relative z-10 -mt-20 px-6 pb-24 md:-mt-40 md:px-12 md:pb-40">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24" data-reveal>
            {/* Curator's note */}
            <div>
              <span className="label-text text-secondary tracking-[0.2em]">Curator&apos;s note</span>
              <p className="mt-6 font-headline text-2xl font-light italic leading-[1.35] text-on-primary/85 md:text-3xl">
                {CURATORS_NOTE}
              </p>
            </div>

            {/* Provenance sheet */}
            <div>
              <dl className="flex flex-col gap-6 md:gap-8">
                <div className="flex items-baseline justify-between border-t-[1px] border-on-primary/20 pt-4 md:pt-6">
                  <dt className="label-text text-on-primary/50 tracking-[0.2em]">Origin</dt>
                  <dd className="font-headline text-xl font-normal italic text-on-primary md:text-2xl">
                    {specimen.origin}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t-[1px] border-on-primary/20 pt-4 md:pt-6">
                  <dt className="label-text text-on-primary/50 tracking-[0.2em]">Weight</dt>
                  <dd className="font-headline text-xl font-normal text-on-primary md:text-2xl">
                    {specimen.weight}
                  </dd>
                </div>
                {specimen.dimensions && (
                  <div className="flex items-baseline justify-between border-t-[1px] border-on-primary/20 pt-4 md:pt-6">
                    <dt className="label-text text-on-primary/50 tracking-[0.2em]">Dimensions</dt>
                    <dd className="font-headline text-xl font-normal text-on-primary md:text-2xl">
                      {specimen.dimensions}
                    </dd>
                  </div>
                )}
              </dl>

              <Link
                href={`/collection/${specimen.slug}`}
                aria-label={`Read the full story of ${specimen.name} from ${specimen.origin}`}
                className="group mt-12 inline-flex items-center gap-3 bg-secondary px-8 py-4 text-on-primary transition-colors hover:bg-on-primary hover:text-primary"
              >
                <span className="font-body text-[14px] font-semibold tracking-[0.1em] uppercase">
                  Read the full story
                </span>
                <span
                  className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
