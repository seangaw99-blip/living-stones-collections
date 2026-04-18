import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { InquiryForm } from '@/components/inquire/inquiry-form';
import { VideoCallForm } from '@/components/inquire/video-call-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inquire About a Specimen',
  description:
    'Ask about a mineral specimen or book a video call to see it live. We show every piece up close — texture, color, and scale — before you commit.',
  alternates: {
    canonical: '/inquire',
  },
  openGraph: {
    title: 'Inquire About a Specimen | The Living Stones Collections',
    description:
      'Book a video call or send a message. We show every piece live before you buy.',
    url: '/inquire',
  },
};

interface InquirePageProps {
  searchParams: Promise<{ piece?: string }>;
}

export default async function InquirePage({
  searchParams,
}: InquirePageProps) {
  const params = await searchParams;

  return (
    <div className="pt-16 pb-24 md:pt-24">
      <Container>
        {/* Header */}
        <div className="mb-16">
          <span className="label-text text-secondary">Inquire</span>
          <h1 className="mt-4 font-headline text-5xl font-normal leading-tight tracking-tight text-primary md:text-6xl">
            See it before you decide.
          </h1>
          <p className="mt-4 max-w-lg font-body text-[15px] leading-[1.7] text-on-surface-variant">
            Every purchase starts with a conversation. Request a video call and
            we will show you the specimen up close &mdash; its texture, color,
            and scale &mdash; before you commit.
          </p>
        </div>

        {/* Two-column forms */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Send a message */}
          <div>
            <div className="mb-8">
              <h2 className="font-headline text-3xl font-normal tracking-tight text-primary">
                Send a message
              </h2>
              <p className="mt-2 font-body text-[14px] text-on-surface-variant">
                Ask about origin, pricing, or availability. We reply within 24
                hours.
              </p>
            </div>
            <Suspense>
              <InquiryForm defaultPiece={params.piece} />
            </Suspense>
          </div>

          {/* Book a video call */}
          <div id="video-call">
            <div className="mb-8">
              <h2 className="font-headline text-3xl font-normal tracking-tight text-primary">
                Book a video call
              </h2>
              <p className="mt-2 font-body text-[14px] text-on-surface-variant">
                See the specimen live via Zoom, Google Meet, or Messenger.
                Available Monday to Saturday, Philippines time.
              </p>
            </div>
            <Suspense>
              <VideoCallForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
