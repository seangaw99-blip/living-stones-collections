'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { getFeaturedHeroStops } from '@/data/featured-hero';
import { cn } from '@/lib/utils';

// Approximate origin coordinates for each specimen (lng, lat)
const ORIGIN_COORDS: Record<string, [number, number]> = {
  'amethyst-cathedral-uruguay': [-55.77, -31.52],
  'azurite-nodule-morocco': [-7.09, 31.79],
  'rhodochrosite-stalactite-argentina': [-66.98, -27.47],
  'malachite-cluster-congo': [23.0, -2.88],
  'celestite-cluster-madagascar': [46.87, -18.77],
  'pyrite-sun-peru': [-75.02, -9.19],
};

const TOPO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const stops = getFeaturedHeroStops();

export function OriginsMap() {
  const [activeSlug, setActiveSlug] = useState<string>(
    stops[0]?.specimen.slug ?? ''
  );

  const active = stops.find((s) => s.specimen.slug === activeSlug) ?? stops[0];
  if (!active) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        {/* Header */}
        <div className="max-w-2xl" data-reveal>
          <span className="label-text text-outline">Globally sourced</span>
          <h2 className="mt-4 font-headline text-4xl font-light leading-[1.1] tracking-tight text-primary md:text-5xl lg:text-6xl">
            Six origins. Six stories.
          </h2>
          <p className="mt-6 max-w-md font-body text-[14px] leading-[1.7] text-on-surface-variant">
            Every specimen in the collection has a place on the map &mdash; a
            mine, a region, a seam of rock that produced it. Hover a point to
            see what came from where.
          </p>
        </div>

        {/* Map — full container width, detail card floats over it */}
        <div className="relative mt-16" data-reveal>
          <div className="relative mx-auto aspect-[16/9] w-[95%] md:aspect-[2/1]">
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 200 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Geographies geography={TOPO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="var(--surface-container-low)"
                      stroke="var(--outline)"
                      strokeWidth={0.7}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {stops.map((s) => {
                const coords = ORIGIN_COORDS[s.specimen.slug];
                if (!coords) return null;
                const isActive = s.specimen.slug === activeSlug;
                return (
                  <Marker
                    key={s.specimen.slug}
                    coordinates={coords}
                    onMouseEnter={() => setActiveSlug(s.specimen.slug)}
                    onFocus={() => setActiveSlug(s.specimen.slug)}
                    onClick={() => setActiveSlug(s.specimen.slug)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show ${s.specimen.name} from ${s.specimen.origin}`}
                    style={{
                      default: { cursor: 'pointer', outline: 'none' },
                      hover: { cursor: 'pointer', outline: 'none' },
                      pressed: { cursor: 'pointer', outline: 'none' },
                    }}
                  >
                    {isActive && (
                      <circle
                        r={14}
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth={1.2}
                        strokeOpacity={0.4}
                        className="origin-pulse"
                      />
                    )}
                    <circle
                      r={isActive ? 6 : 4.5}
                      fill="var(--secondary)"
                      className="transition-all duration-300"
                    />
                    <circle r={18} fill="transparent" />
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>

          {/* Floating detail card — bottom-right of map on desktop, below on mobile */}
          <aside className="relative mt-8 max-w-full md:absolute md:left-0 md:top-0 md:mt-0 md:max-w-[280px] lg:max-w-[320px]">
            <div
              key={active.specimen.slug}
              className="hero-fade-up hairline flex flex-col bg-background p-5 md:p-6"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-dim">
                <Image
                  src={active.specimen.images[0]}
                  alt={`${active.specimen.name} from ${active.specimen.origin} — ${active.specimen.weight} mineral specimen`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                {active.specimen.tags.length > 0 && (
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {active.specimen.tags.map((tag) => (
                      <Tag key={tag} variant={tag} />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-3">
                <span className="label-text text-outline">Now showing</span>
                <span className="label-text text-secondary">
                  {active.accentLabel}
                </span>
              </div>
              <h3 className="mt-2 font-headline text-xl font-light leading-snug tracking-tight text-primary md:text-2xl">
                {active.specimen.name}
              </h3>
              <p className="mt-2 font-headline text-base font-light italic text-primary/75">
                {active.specimen.origin}
              </p>
              <p className="mt-1 label-text text-outline">
                {active.specimen.weight}
                {active.specimen.dimensions &&
                  ` · ${active.specimen.dimensions}`}
              </p>

              <p className="mt-4 font-body text-[13px] leading-[1.65] text-on-surface-variant line-clamp-3">
                {active.specimen.formationNotes}
              </p>

              <div className="mt-5 hairline-top pt-4">
                <Link
                  href={`/collection/${active.specimen.slug}`}
                  className="group inline-flex items-center gap-2 font-body text-[13px] text-on-surface underline underline-offset-4 decoration-[0.5px] decoration-outline/50 transition-colors hover:text-secondary"
                >
                  View this piece
                  <span
                    className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Origin list — caption row below */}
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {stops.map((s) => {
            const isActive = s.specimen.slug === activeSlug;
            return (
              <button
                key={s.specimen.slug}
                type="button"
                onMouseEnter={() => setActiveSlug(s.specimen.slug)}
                onFocus={() => setActiveSlug(s.specimen.slug)}
                onClick={() => setActiveSlug(s.specimen.slug)}
                className={cn(
                  'label-text transition-colors',
                  isActive
                    ? 'text-secondary'
                    : 'text-outline hover:text-primary'
                )}
              >
                {s.specimen.origin}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
