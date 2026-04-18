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
    <section className="py-32 md:py-40 lg:py-48">
      <Container>
        {/* Section header — viewport-filling */}
        <header className="mb-24 max-w-5xl md:mb-32" data-reveal>
          <span className="label-text text-secondary tracking-[0.2em]">Philosophy</span>
          <h2 className="mt-6 font-headline font-medium leading-[0.92] tracking-[-0.03em] text-primary text-[clamp(48px,9vw,180px)]">
            Fewer pieces.
            <br />
            <span className="italic font-light text-primary/50">Chosen slowly.</span>
          </h2>
        </header>

        {/* Full-bleed image break — dominant visual moment */}
        <div className="relative -mx-6 mb-24 aspect-[21/9] overflow-hidden md:-mx-12 md:mb-32 xl:mx-[calc(50%-50vw)]" data-reveal>
          <Image
            src="/specimens/celestite.jpg"
            alt="Celestite crystal cluster — representative of specimen singularity"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-14 md:left-16">
            <span className="label-text text-on-primary/60 tracking-[0.2em]">In collection</span>
            <p className="mt-2 font-headline text-3xl font-normal italic text-on-primary md:text-5xl">
              Celestite cluster, Madagascar
            </p>
          </div>
        </div>

        {/* Three statement rows — full-width, massive numerals, editorial */}
        <div className="space-y-20 md:space-y-28">
          {statements.map((s, i) => (
            <article
              key={s.n}
              data-reveal
              className="grid grid-cols-1 items-start gap-8 border-t-[1px] border-outline/40 pt-12 md:grid-cols-[auto_1fr] md:gap-16 md:pt-16"
            >
              {/* Huge display numeral */}
              <span className="font-headline font-normal leading-none text-secondary text-[clamp(96px,14vw,240px)] tracking-[-0.04em]">
                {s.n}
              </span>

              {/* Text block */}
              <div className="max-w-3xl md:pt-6">
                <span className="label-text text-outline tracking-[0.2em]">{s.meta}</span>
                <h3 className="mt-4 font-headline font-medium leading-[0.98] tracking-[-0.02em] text-primary text-[clamp(36px,5vw,72px)]">
                  {s.headline}
                </h3>
                <p className="mt-8 max-w-xl font-body text-[17px] leading-[1.7] text-on-surface-variant md:text-[18px]">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
