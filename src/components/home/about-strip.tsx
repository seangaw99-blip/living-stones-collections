import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';

const sourcingPoints = [
  'Direct from miners and verified dealers worldwide.',
  'Each piece inspected and documented before listing.',
  'Provenance notes ship with every order.',
];

export function AboutStrip() {
  return (
    <section className="relative py-32 md:py-40">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          {/* LEFT — colossal asymmetric headline */}
          <div data-reveal>
            <span className="label-text text-secondary tracking-[0.2em]">About</span>
            <h2 className="mt-8 font-headline font-medium leading-[0.88] tracking-[-0.03em] text-primary text-[clamp(56px,8vw,160px)]">
              Pieces you
              <br />
              would
              <br />
              <span className="italic font-light text-primary/55">keep.</span>
            </h2>
            <p className="mt-10 max-w-md font-body text-[17px] leading-[1.7] text-on-surface-variant md:text-[18px]">
              The Living Stones is built for collectors who take their time. We
              source slowly, select fewer, and only carry specimens worth
              returning to.
            </p>

            {/* Sourcing numbered list */}
            <ol className="mt-12 space-y-6 md:mt-16">
              {sourcingPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-6 border-t-[1px] border-outline/40 pt-6"
                >
                  <span className="font-headline text-4xl font-medium leading-none text-secondary tracking-tight md:text-5xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-[15px] leading-[1.6] text-on-surface md:text-[16px]">
                    {point}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-on-primary transition-colors hover:bg-secondary"
              >
                <span className="font-body text-[14px] font-semibold tracking-[0.1em] uppercase">
                  Our story
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

          {/* RIGHT — tall portrait image, bleeds off the right edge */}
          <div className="relative" data-reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-dim lg:aspect-[3/4] xl:mr-[calc(50%-50vw)]">
              <Image
                src="/specimens/amethyst.jpg"
                alt="Amethyst cathedral — representative of The Living Stones curation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-background/95 px-5 py-3 backdrop-blur-sm md:bottom-10 md:left-10">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="label-text text-primary tracking-[0.2em]">Amethyst cathedral</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
