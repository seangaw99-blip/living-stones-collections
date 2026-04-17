import type { Metadata } from 'next';
import { Hero } from '@/components/home/hero';

export const metadata: Metadata = {
  title: {
    absolute: 'Rare Mineral Specimens | Living Stones Collections',
  },
  description:
    'One-of-one mineral specimens sourced from six origins worldwide — rhodochrosite, celestite, azurite, and more. Each piece is singular. Based in Manila, Philippines.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rare Mineral Specimens | Living Stones Collections',
    description:
      'One-of-one mineral specimens sourced from six origins worldwide. Each piece is singular.',
    url: '/',
  },
};
import { StatementCards } from '@/components/home/statement-cards';
import { OriginsMap } from '@/components/home/origins-map';
import { EditorialSpotlight } from '@/components/home/editorial-spotlight';
import { InquirySection } from '@/components/home/inquiry-section';
import { EmailSignup } from '@/components/home/email-signup';
import { ScrollRevealWrapper } from '@/components/home/scroll-reveal-wrapper';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollRevealWrapper>
        <StatementCards />
        <OriginsMap />
        <EditorialSpotlight />
        <InquirySection />
        <EmailSignup />
      </ScrollRevealWrapper>
    </>
  );
}
