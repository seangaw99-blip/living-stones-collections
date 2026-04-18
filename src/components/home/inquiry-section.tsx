import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';

export function InquirySection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Before you decide"
          heading="See it before you decide."
          subtitle="Every purchase starts with a conversation. Request a video call and we will show you the specimen up close — its texture, color, and scale — before you commit."
          className="max-w-2xl"
        />

        <div
          className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
          data-reveal
        >
          {/* Video call — FEATURED dark card */}
          <div className="flex flex-col bg-primary-container text-on-primary p-10 md:p-12">
            <span
              className="material-symbols-outlined text-secondary text-[32px]"
              aria-hidden
            >
              videocam
            </span>
            <h3 className="mt-6 font-headline text-3xl font-normal text-on-primary">
              Book a video call
            </h3>
            <p className="mt-4 flex-1 font-body text-[15px] leading-[1.7] text-on-primary/75">
              See the specimen live via Zoom, Google Meet, or Messenger.
            </p>
            <p className="mt-4 label-text text-on-primary/50">
              Monday&ndash;Saturday &middot; PHT
            </p>
            <div className="mt-8">
              <Link href="/inquire#video-call">
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-on-primary font-body font-medium px-6 py-2.5 text-[14px] hover:bg-secondary-container hover:text-primary transition-colors duration-300">
                  Book a call
                </button>
              </Link>
            </div>
          </div>

          {/* Send message — light card */}
          <div className="flex flex-col hairline bg-surface p-10 md:p-12">
            <span
              className="material-symbols-outlined text-on-surface-variant text-[32px]"
              aria-hidden
            >
              mail
            </span>
            <h3 className="mt-6 font-headline text-3xl font-normal text-primary">
              Send a message
            </h3>
            <p className="mt-4 flex-1 font-body text-[15px] leading-[1.7] text-on-surface-variant">
              Ask about origin, pricing, or availability. We reply within 24
              hours.
            </p>
            <p className="mt-4 label-text text-outline">
              Response within 24 hours
            </p>
            <div className="mt-8">
              <Link href="/inquire">
                <Button variant="ghost" size="sm">Send a message</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
