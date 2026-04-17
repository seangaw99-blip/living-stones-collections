import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

const sourcingPoints = [
  'Direct from miners and verified mineral dealers worldwide.',
  'Each piece is inspected and documented before listing.',
  'Origin, weight, and formation notes included with every order.',
];

export function AboutStrip() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — copy */}
          <div data-reveal>
            <span className="label-text text-outline">About</span>
            <h2 className="mt-4 font-headline text-4xl font-light leading-[1.1] tracking-tight text-primary md:text-5xl">
              Pieces you would keep. Not just own.
            </h2>
            <p className="mt-6 max-w-md font-body text-[14px] leading-[1.7] text-on-surface-variant">
              The Living Stones is built for collectors who take their time. We
              source slowly, select fewer, and only carry specimens worth
              returning to.
            </p>
            <div className="mt-8">
              <Link href="/about">
                <Button variant="ghost">Our story</Button>
              </Link>
            </div>
          </div>

          {/* Right — sourcing points */}
          <div data-reveal>
            {sourcingPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-5 border-b-[0.5px] border-outline-variant/40 py-6 first:border-t-[0.5px] first:border-t-outline-variant/40"
              >
                <span className="shrink-0 font-body text-[11px] tracking-wider text-secondary/70">
                  0{i + 1}
                </span>
                <p className="font-body text-[14px] leading-[1.7] text-on-surface-variant">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
