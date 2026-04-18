import { Container } from '@/components/ui/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Handling',
  description:
    'Local Philippine delivery and international shipping for mineral specimens. Each piece is archival-packed with foam cradles and double-boxed for safe transit.',
  alternates: {
    canonical: '/shipping',
  },
  openGraph: {
    title: 'Shipping & Handling | The Living Stones Collections',
    description:
      'Nationwide Philippine delivery and international shipping available. Archival packing on every order.',
    url: '/shipping',
  },
};

export default function ShippingPage() {
  return (
    <div className="pt-16 pb-24 md:pt-24">
      <Container size="narrow">
        <span className="label-text text-secondary">Shipping</span>

        <h1 className="mt-4 font-headline text-5xl font-normal leading-tight tracking-tight text-primary md:text-6xl">
          Shipping &amp; handling.
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Local PH */}
          <div className="bg-surface-container-low p-8 md:p-10">
            <span className="label-text text-outline">Philippines</span>
            <h2 className="mt-3 font-headline text-2xl font-normal text-primary">
              Nationwide delivery
            </h2>
            <p className="mt-4 font-body text-[14px] leading-[1.7] text-on-surface-variant">
              All local orders are shipped within the Philippines using a
              trusted courier service. Each specimen is wrapped individually
              and packed to prevent movement during transit.
            </p>
          </div>

          {/* International */}
          <div className="bg-surface-container-low p-8 md:p-10">
            <span className="label-text text-outline">International</span>
            <h2 className="mt-3 font-headline text-2xl font-normal text-primary">
              Inquiry first
            </h2>
            <p className="mt-4 font-body text-[14px] leading-[1.7] text-on-surface-variant">
              International shipping is available but requires an inquiry
              before payment. We confirm rates and transit details, then send
              you an invoice directly.
            </p>
          </div>
        </div>

        <div className="mt-16 hairline-top pt-10">
          <h2 className="font-headline text-3xl font-normal tracking-tight text-primary">
            Packaging
          </h2>
          <p className="mt-4 max-w-md font-body text-[15px] leading-[1.7] text-on-surface-variant">
            Every piece is wrapped in archival tissue, cushioned with foam, and
            boxed securely. Specimens with fragile formations receive
            additional internal bracing. Our goal is that the piece arrives
            exactly as it left.
          </p>
        </div>
      </Container>
    </div>
  );
}
