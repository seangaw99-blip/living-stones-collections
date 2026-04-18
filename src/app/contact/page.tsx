import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Reach The Living Stones Collections in Manila, Philippines. Ask about a specimen, provenance, or shipping. We reply personally within 24 hours.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | The Living Stones Collections',
    description:
      'Reach us in Manila, Philippines. Ask about a specimen, provenance, or shipping — we reply personally within 24 hours.',
    url: '/contact',
  },
};

const details = [
  {
    label: 'General inquiries',
    value: 'hello@livingstonescollections.com',
    href: 'mailto:hello@livingstonescollections.com',
  },
  {
    label: 'Based in',
    value: 'Manila, Philippines',
  },
  {
    label: 'Showroom',
    value: 'By appointment only',
  },
  {
    label: 'Hours',
    value: 'Monday \u2013 Saturday  \u00B7  10:00 AM \u2013 6:00 PM (PHT)',
  },
  {
    label: 'Response time',
    value: 'Within 24 hours, Monday through Saturday',
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-24 md:pt-32">
      <Container>
        {/* Header */}
        <div className="max-w-3xl">
          <span className="label-text text-secondary">Contact</span>
          <h1 className="mt-4 font-headline text-5xl font-normal leading-tight tracking-tight text-primary md:text-6xl lg:text-7xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-6 max-w-lg font-body text-base leading-[1.7] text-on-surface-variant">
            Questions about a piece, provenance, shipping, or anything else &mdash; we reply personally. No bots, no auto-responders.
          </p>
        </div>

        {/* Two-column editorial split */}
        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Left — contact details */}
          <dl className="lg:col-span-7">
            {details.map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-1 items-baseline gap-2 border-b-[0.5px] border-outline-variant/40 py-6 sm:grid-cols-[180px_1fr] sm:gap-8 first:border-t-[0.5px] first:border-t-outline-variant/40"
                style={{ '--index': i } as React.CSSProperties}
                data-reveal
              >
                <dt className="label-text text-outline">{item.label}</dt>
                <dd className="font-headline text-lg font-normal text-primary md:text-xl">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="underline-offset-4 transition-colors hover:text-secondary hover:underline decoration-[0.5px]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {/* Right — primary actions */}
          <div className="lg:col-span-5" data-reveal>
            <div className="bg-surface-container-low p-10 md:p-12">
              <span className="label-text text-outline">Start a conversation</span>
              <h2 className="mt-3 font-headline text-3xl font-normal leading-tight tracking-tight text-primary md:text-4xl">
                Two ways to reach us.
              </h2>

              <div className="mt-10 flex flex-col gap-5">
                <div>
                  <h3 className="font-headline text-xl font-normal text-primary">
                    Send a message
                  </h3>
                  <p className="mt-1 font-body text-[14px] leading-[1.7] text-on-surface-variant">
                    Ask about a specimen, request provenance details, or just say hello.
                  </p>
                  <div className="mt-4">
                    <Link href="/inquire">
                      <Button variant="primary" size="sm">
                        Send a message
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="hairline-top pt-6">
                  <h3 className="font-headline text-xl font-normal text-primary">
                    Book a video call
                  </h3>
                  <p className="mt-1 font-body text-[14px] leading-[1.7] text-on-surface-variant">
                    See the specimen live via Zoom, Google Meet, or Messenger.
                  </p>
                  <div className="mt-4">
                    <Link href="/inquire#video-call">
                      <Button variant="ghost" size="sm">
                        Book a call
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-20 max-w-xl hairline-top pt-10" data-reveal>
          <p className="font-headline text-xl font-normal italic leading-snug text-primary/80 md:text-2xl">
            &ldquo;Every purchase starts with a conversation. We&rsquo;d rather
            know who the piece is going to than make a quiet sale.&rdquo;
          </p>
        </div>
      </Container>
    </div>
  );
}
