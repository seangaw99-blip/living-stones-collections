import Image from 'next/image';
import { Container } from '@/components/ui/container';

const statements = [
  {
    n: '01',
    headline: 'Every piece is singular.',
    body: 'No two specimens are the same. When it sells, it is gone — replaced only when we find something of equal or greater quality and character.',
    meta: 'One-of-one',
  },
  {
    n: '02',
    headline: 'Origin matters here.',
    body: 'Each listing names the country, region, and formation type. Provenance documentation ships with every order.',
    meta: 'Six origins',
  },
  {
    n: '03',
    headline: 'Curated, not catalogued.',
    body: 'We carry fewer pieces on purpose. Selection comes before scale; every stone has been held, inspected, and chosen.',
    meta: 'Quality over volume',
  },
];

export function StatementCards() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        {/* Section header */}
        <header className="mb-16 max-w-2xl md:mb-20" data-reveal>
          <span className="label-text text-secondary">Philosophy</span>
          <h2 className="mt-4 font-headline text-5xl font-normal leading-[1.02] tracking-tight text-primary md:text-6xl lg:text-7xl">
            Fewer pieces.{' '}
            <span className="italic font-light text-primary/55">Chosen slowly.</span>
          </h2>
        </header>

        {/* Asymmetric bento — dominant left card with image + two stacked text cards right */}
        <div className="grid grid-cols-1 gap-px bg-outline-variant/50 md:grid-cols-12 md:grid-rows-[auto_auto]">
          {/* Card 01 — dominant, spans 7 cols × 2 rows */}
          <article
            data-reveal
            className="group relative flex flex-col bg-surface md:col-span-7 md:row-span-2"
          >
            {/* Visual — top half of card */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dim md:aspect-[5/3]">
              <Image
                src="/specimens/celestite.jpg"
                alt="Celestite crystal cluster — representative of specimen singularity"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>

            {/* Text — generous padding */}
            <div className="flex flex-1 flex-col p-8 md:p-12 lg:p-14">
              <div className="flex items-start justify-between gap-6">
                <span className="font-headline text-5xl font-normal leading-none text-secondary md:text-6xl">
                  {statements[0].n}
                </span>
                <span className="label-text self-end text-outline">
                  {statements[0].meta}
                </span>
              </div>
              <h3 className="mt-8 font-headline text-3xl font-normal leading-tight text-primary md:text-4xl">
                {statements[0].headline}
              </h3>
              <p className="mt-5 max-w-md font-body text-[15px] leading-[1.75] text-on-surface-variant md:text-[15px]">
                {statements[0].body}
              </p>
            </div>
          </article>

          {/* Card 02 — top right */}
          <article
            data-reveal
            className="flex flex-col bg-surface p-8 md:col-span-5 md:p-12 lg:p-14"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-headline text-4xl font-normal leading-none text-secondary md:text-5xl">
                {statements[1].n}
              </span>
              <span className="label-text self-end text-outline">
                {statements[1].meta}
              </span>
            </div>
            <h3 className="mt-8 font-headline text-3xl font-normal leading-tight text-primary md:text-4xl">
              {statements[1].headline}
            </h3>
            <p className="mt-5 font-body text-[15px] leading-[1.75] text-on-surface-variant md:text-[15px]">
              {statements[1].body}
            </p>
          </article>

          {/* Card 03 — bottom right */}
          <article
            data-reveal
            className="flex flex-col bg-surface p-8 md:col-span-5 md:p-12 lg:p-14"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-headline text-4xl font-normal leading-none text-secondary md:text-5xl">
                {statements[2].n}
              </span>
              <span className="label-text self-end text-outline">
                {statements[2].meta}
              </span>
            </div>
            <h3 className="mt-8 font-headline text-3xl font-normal leading-tight text-primary md:text-4xl">
              {statements[2].headline}
            </h3>
            <p className="mt-5 font-body text-[15px] leading-[1.75] text-on-surface-variant md:text-[15px]">
              {statements[2].body}
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
