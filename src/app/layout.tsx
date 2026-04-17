import type { Metadata, Viewport } from 'next';
import { Manrope, Newsreader } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/context/cart-context';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
});

const BASE_URL = 'https://livingstonescollections.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Rare Mineral Specimens | Living Stones Collections',
    template: '%s | Living Stones Collections',
  },
  description:
    'Rare mineral specimens sourced from six origins worldwide. Curated for collectors who value what lasts. Based in Manila, Philippines.',
  keywords: [
    'mineral specimens',
    'rare crystals',
    'mineral collector',
    'natural minerals Philippines',
    'rare minerals for sale',
    'collector grade minerals',
    'geological art',
    'crystal specimens Manila',
  ],
  authors: [{ name: 'The Living Stones Collections' }],
  creator: 'The Living Stones Collections',
  publisher: 'The Living Stones Collections',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: BASE_URL,
    siteName: 'The Living Stones Collections',
    title: 'Rare Mineral Specimens | Living Stones Collections',
    description:
      'Rare mineral specimens sourced from six origins worldwide. Curated for collectors who value what lasts.',
    images: [
      {
        url: '/specimens/rhodochrosite.jpg',
        width: 1200,
        height: 630,
        alt: 'Rhodochrosite stalactite slice from Capillitas, Argentina — The Living Stones Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rare Mineral Specimens | Living Stones Collections',
    description:
      'Rare mineral specimens sourced from six origins worldwide. Curated for collectors who value what lasts.',
    images: ['/specimens/rhodochrosite.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5F2' },
    { media: '(prefers-color-scheme: dark)', color: '#3A3530' },
  ],
  colorScheme: 'light',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Living Stones Collections',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    'Curated rare mineral specimens for discerning collectors. Sourced from six origins worldwide.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@livingstonescollections.com',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Living Stones Collections',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/collection?origin={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'The Living Stones Collections',
  description:
    'Curated rare mineral specimens for collectors. Based in Manila, Philippines.',
  url: BASE_URL,
  email: 'hello@livingstonescollections.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Manila',
    addressRegion: 'Metro Manila',
    addressCountry: 'PH',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  priceRange: '₱₱₱',
  currenciesAccepted: 'PHP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-PH"
      className={`${manrope.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface text-on-background">
        <div className="ambient-warm" aria-hidden />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
