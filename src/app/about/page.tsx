import { Container } from '@/components/ui/container';
import type { Metadata } from 'next';

const faqs = [
  {
    q: 'How do you source your specimens?',
    a: 'We buy directly from artisanal miners and a small group of mineral dealers we have worked with for years. Every stone is inspected in person or on a live video call before we accept it into the collection.',
  },
  {
    q: 'Are your specimens natural or treated?',
    a: 'Every piece is natural unless specifically noted. We do not carry dyed, heated, or reconstituted material. If a stone has been stabilised (for structural reasons only), that is disclosed on the product page.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, but international orders start with an inquiry. We confirm shipping rates, packaging requirements, and transit times before sending an invoice. This lets us quote accurately and avoid surprises at customs.',
  },
  {
    q: 'How are specimens packaged for shipping?',
    a: 'Archival tissue, foam cradles, and double-boxed crates with documentation and photos taken at every handoff. Fragile formations get additional internal bracing. Our goal: the piece arrives exactly as it left.',
  },
  {
    q: 'Can I request a video call before buying?',
    a: 'Yes, and we encourage it. Book a call through the Contact page and we will show you the specimen live from multiple angles, in natural light, with a scale reference.',
  },
  {
    q: 'What is your return policy?',
    a: 'Because every piece is singular, returns are handled case by case. If a specimen arrives damaged or is materially different from what was shown, we refund in full and cover return shipping. Otherwise, we ask buyers to use the inquiry process so we can resolve concerns personally.',
  },
  {
    q: 'Do you offer provenance documentation?',
    a: 'Every order ships with a dossier covering origin, mine or region, weight, dimensions, formation notes, and (when available) the name of the miner or dealer. For collector-grade pieces we can provide additional verification on request.',
  },
];

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'The Living Stones Collections sources directly from miners and verified mineral dealers worldwide. Every specimen is inspected, documented, and chosen slowly.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Our Story & Sourcing Philosophy | Living Stones Collections',
    description:
      'We source directly from miners and verified dealers. Every specimen is inspected before listing — natural, untreated, and singular.',
    url: '/about',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://livingstonescollections.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://livingstonescollections.com/about' },
  ],
};

export default function AboutPage() {
  return (
    <div className="pt-16 pb-24 md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container size="narrow">
        <span className="label-text text-secondary">About</span>

        <h1 className="mt-4 font-headline text-5xl font-normal leading-[1.02] tracking-tight text-primary md:text-6xl lg:text-7xl">
          Pieces you would keep. Not just own.
        </h1>

        <div className="mt-12 hairline-top" />

        <div className="mt-12 space-y-8 font-body text-[15px] leading-[1.9] text-on-surface-variant">
          <p>
            The Living Stones is built for collectors who take their time. We
            source slowly, select fewer, and only carry specimens worth
            returning to.
          </p>
          <p>
            Every piece in our collection is singular. There is no restocking.
            When a specimen sells, it is gone &mdash; replaced only when we find
            something of equal or greater quality and character.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-headline text-3xl font-normal tracking-tight text-primary">
            How we source
          </h2>
          <div className="mt-8">
            {[
              {
                n: '01',
                text: 'Direct from miners and verified mineral dealers worldwide.',
              },
              {
                n: '02',
                text: 'Each piece is inspected and documented before listing.',
              },
              {
                n: '03',
                text: 'Origin, weight, and formation notes included with every order.',
              },
            ].map((item) => (
              <div
                key={item.n}
                className="flex items-start gap-6 border-b-[0.5px] border-outline-variant/40 py-6 first:border-t-[0.5px] first:border-t-outline-variant/40"
              >
                <span className="label-text mt-1 shrink-0 text-secondary/70">
                  {item.n}
                </span>
                <p className="font-body text-[15px] leading-[1.7] text-on-surface-variant">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <span className="label-text text-secondary">FAQ</span>
          <h2 className="mt-4 font-headline text-3xl font-normal tracking-tight text-primary md:text-4xl">
            Common questions.
          </h2>

          <div className="mt-10">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group border-b-[0.5px] border-outline-variant/40 first:border-t-[0.5px] first:border-t-outline-variant/40"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-primary transition-colors hover:text-secondary [&::-webkit-details-marker]:hidden">
                  <h3 className="font-headline text-lg font-normal leading-snug md:text-xl">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden
                    className="relative mt-1 h-4 w-4 shrink-0 text-outline transition-colors group-open:text-secondary"
                  >
                    {/* Horizontal line */}
                    <span className="absolute left-0 top-1/2 h-[0.5px] w-4 -translate-y-1/2 bg-current" />
                    {/* Vertical line — rotates to become horizontal when open */}
                    <span className="absolute left-1/2 top-0 h-4 w-[0.5px] -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90" />
                  </span>
                </summary>
                <div className="pb-6 pr-10">
                  <p className="max-w-2xl font-body text-[15px] leading-[1.7] text-on-surface-variant">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
