import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ImageGallery } from '@/components/collection/image-gallery';
import { ProductCard } from '@/components/ui/product-card';
import { getSpecimenBySlug, getAllSpecimens } from '@/data/queries';
import { originToSlug } from '@/lib/utils';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSpecimens().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const specimen = getSpecimenBySlug(slug);
  if (!specimen) return {};
  const ogTitle = `${specimen.name} — ${specimen.origin} Mineral Specimen`;
  const description = `${specimen.formationNotes} ${specimen.weight}. ${specimen.status === 'available' ? 'Available now.' : 'Previously held.'}`.slice(0, 160);
  return {
    title: {
      absolute: `${specimen.name} | Living Stones Collections`,
    },
    description,
    alternates: {
      canonical: `/collection/${specimen.slug}`,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: `/collection/${specimen.slug}`,
      images: specimen.images[0]
        ? [
            {
              url: specimen.images[0],
              alt: `${specimen.name} from ${specimen.origin} — ${specimen.weight}`,
            },
          ]
        : undefined,
    },
  };
}

const BASE_URL = 'https://livingstonescollections.com';

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const specimen = getSpecimenBySlug(slug);

  if (!specimen) notFound();

  const isSold = specimen.status === 'sold';
  const related = getAllSpecimens()
    .filter((s) => s.slug !== specimen.slug && s.status === 'available')
    .slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: specimen.name,
    description: specimen.formationNotes,
    sku: specimen.slug,
    mpn: `LSC-${specimen.slug.toUpperCase()}`,
    image: specimen.images.map((img) =>
      img.startsWith('http') ? img : `${BASE_URL}${img}`
    ),
    brand: {
      '@type': 'Brand',
      name: 'The Living Stones Collections',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/collection/${specimen.slug}`,
      priceCurrency: 'PHP',
      price: specimen.price,
      availability:
        specimen.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'The Living Stones Collections',
      },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Origin', value: specimen.origin },
      { '@type': 'PropertyValue', name: 'Weight', value: specimen.weight },
      ...(specimen.dimensions
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Dimensions',
              value: specimen.dimensions,
            },
          ]
        : []),
    ],
  };

  const originCountry = specimen.origin.split(',').pop()!.trim();
  const originSlug = originToSlug(specimen.origin);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Collection',
        item: `${BASE_URL}/collection`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: originCountry,
        item: `${BASE_URL}/collection/origin/${originSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: specimen.name,
        item: `${BASE_URL}/collection/${specimen.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-6 py-16 md:px-12 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Visible breadcrumb nav */}
      <div className="mb-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collection', href: '/collection' },
            {
              label: specimen.origin.split(',').pop()!.trim(),
              href: `/collection/origin/${originToSlug(specimen.origin)}`,
            },
            { label: specimen.name },
          ]}
        />
      </div>

      {/* Specimen Hero — Asymmetrical 1fr + 400px */}
      <section className="mb-32 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_400px] lg:gap-24">
        {/* Image */}
        <ImageGallery images={specimen.images} name={specimen.name} />

        {/* Info column — sticky */}
        <div className="flex flex-col pt-0 lg:sticky lg:top-32 lg:pt-24">
          {/* Tags */}
          {(specimen.tags.length > 0 || isSold) && (
            <div className="mb-8 flex flex-wrap gap-2 self-start">
              {isSold ? (
                <Tag variant="sold" />
              ) : (
                specimen.tags.map((tag) => <Tag key={tag} variant={tag} />)
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 font-headline text-5xl font-light leading-tight text-on-surface">
            {specimen.name}
          </h1>

          {/* Origin, weight, dimensions */}
          <p className="label-text mb-10 text-outline">
            {specimen.origin} &middot; {specimen.weight}
            {specimen.dimensions && ` · ${specimen.dimensions}`}
          </p>

          {/* Formation notes */}
          <div className="mb-12 border-l-[0.5px] border-outline-variant/60 pl-6">
            <p className="max-w-sm font-body text-sm leading-[1.7] text-on-surface-variant">
              {specimen.formationNotes}
            </p>
          </div>

          {/* Price */}
          {!isSold && (
            <p className="mb-12 font-headline text-3xl font-light text-on-surface">
              &#8369;{specimen.price.toLocaleString()}
            </p>
          )}

          {/* Actions */}
          {!isSold ? (
            <div className="flex flex-col gap-4">
              <Link href="/cart">
                <Button variant="primary" className="w-full">
                  Add to cart
                </Button>
              </Link>
              <Link
                href={`/inquire?piece=${encodeURIComponent(specimen.name)}`}
              >
                <Button variant="ghost" className="w-full">
                  Inquire
                </Button>
              </Link>
              <Link
                href="/inquire#video-call"
                className="mt-4 self-start font-body text-sm text-outline underline underline-offset-4 decoration-[0.5px] decoration-outline/50 transition-colors hover:text-on-surface"
              >
                Book a video call
              </Link>
            </div>
          ) : (
            <div className="hairline rounded-lg px-6 py-4 text-center">
              <p className="font-body text-sm text-on-surface-variant">
                This piece has been sold.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-32 grid grid-cols-1 gap-12 border-t-[0.5px] border-outline-variant/40 pt-20 md:grid-cols-2 md:gap-24">
        <div className="bg-surface-container-low p-10 lg:p-14">
          <h3 className="mb-6 font-headline text-2xl font-light text-on-surface">
            Formation &amp; History
          </h3>
          <p className="font-body text-sm leading-[1.7] text-on-surface-variant">
            {specimen.description}
          </p>
          <p className="mt-6 font-body text-sm leading-[1.7] text-on-surface-variant">
            <a
              href={`https://www.mindat.org/search.php?search=${encodeURIComponent(
                specimen.name.split(' ')[0]
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline-offset-4 decoration-[0.5px] hover:underline"
            >
              Read more about {specimen.name.split(' ')[0]} on Mindat.org
            </a>
            <span aria-hidden className="ml-1 text-outline">
              &#8599;
            </span>
          </p>
        </div>
        <div className="bg-surface-container-low p-10 lg:p-14">
          <h3 className="mb-6 font-headline text-2xl font-light text-on-surface">
            Shipping Details
          </h3>
          <p className="mb-6 font-body text-sm leading-[1.7] text-on-surface-variant">
            Each specimen is secured in custom archival packaging to prevent
            damage to delicate crystal structures.
          </p>
          <p className="label-text text-outline">
            Ships within 3&ndash;5 business days.
          </p>
        </div>
      </section>

      {/* Related specimens */}
      {related.length > 0 && (
        <section className="mb-16">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-headline text-3xl font-light text-on-surface">
              Related specimens
            </h2>
            <Link
              href="/collection"
              className="hidden font-body text-sm text-outline underline underline-offset-4 decoration-[0.5px] decoration-outline/50 transition-colors hover:text-on-surface md:block"
            >
              View all specimens
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} specimen={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
