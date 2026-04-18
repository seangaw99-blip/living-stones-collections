'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

// Auto-advance cycle (ms per origin)
const CYCLE_MS = 4500;
// Pause auto-advance for this long after a user interaction (ms)
const INTERACTION_LOCK_MS = 12000;

export function OriginsMap() {
  const [activeSlug, setActiveSlug] = useState<string>(
    stops[0]?.specimen.slug ?? ''
  );
  const sectionRef = useRef<HTMLElement>(null);
  const lockUntilRef = useRef(0);
  const inViewRef = useRef(false);

  // User interaction handler — updates active slug AND arms the pause lock
  const selectStop = useCallback((slug: string) => {
    setActiveSlug(slug);
    lockUntilRef.current = Date.now() + INTERACTION_LOCK_MS;
  }, []);

  // Auto-advance driver — cycles through origins when section is visible + not locked
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);

    const tick = () => {
      if (!inViewRef.current || Date.now() < lockUntilRef.current) return;
      setActiveSlug((current) => {
        const idx = stops.findIndex((s) => s.specimen.slug === current);
        const next = stops[(idx + 1) % stops.length];
        return next?.specimen.slug ?? stops[0]!.specimen.slug;
      });
    };

    const interval = window.setInterval(tick, CYCLE_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  const active = stops.find((s) => s.specimen.slug === activeSlug) ?? stops[0];
  if (!active) return null;

  return (
    <section ref={sectionRef} className="py-32 md:py-40">
      <Container>
        {/* Header */}
        <div className="max-w-2xl" data-reveal>
          <span className="label-text text-secondary">Globally sourced</span>
          <h2 className="mt-4 font-headline text-4xl font-normal leading-[1.1] tracking-tight text-primary md:text-5xl lg:text-6xl">
            Six origins. Six stories.
          </h2>
          <p className="mt-6 max-w-md font-body text-[15px] leading-[1.7] text-on-surface-variant">
            Every specimen in the collection has a place on the map &mdash; a
            mine, a region, a seam of rock that produced it.{' '}
            <span className="hidden md:inline">Tap a point to pause and focus on it.</span>
            <span className="md:hidden">Cycles through origins. Tap a pill to pause.</span>
          </p>
        </div>

        {/* ── Mobile layout: origin pills + detail card ── */}
        <div className="mt-12 md:hidden" data-reveal>
          {/* Horizontal scrollable origin pills */}
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 no-scrollbar">
            {stops.map((s) => {
              const isActive = s.specimen.slug === activeSlug;
              const country = s.specimen.origin.includes(',')
                ? s.specimen.origin.split(',').pop()!.trim()
                : s.specimen.origin;
              return (
                <button
                  key={s.specimen.slug}
                  type="button"
                  onClick={() => selectStop(s.specimen.slug)}
                  className={cn(
                    'shrink-0 rounded-full border px-4 py-2 font-body text-[12px] transition-colors duration-200',
                    isActive
                      ? 'border-secondary bg-secondary text-on-primary'
                      : 'border-outline-variant text-on-surface-variant hover:border-outline'
                  )}
                >
                  {country}
                </button>
              );
            })}
          </div>

          {/* Detail card — full width on mobile */}
          <div
            key={active.specimen.slug}
            className="hero-fade-up mt-6 hairline flex flex-col bg-background p-5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-dim">
              <Image
                src={active.specimen.images[0]}
                alt={`${active.specimen.name} from ${active.specimen.origin} — ${active.specimen.weight} mineral specimen`}
                fill
                className="object-cover"
                sizes="100vw"
              />
              {active.specimen.tags.length > 0 && (
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  {active.specimen.tags.map((tag) => <Tag key={tag} variant={tag} />)}
                </div>
              )}
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <span className="label-text text-outline">Now showing</span>
              <span className="label-text text-secondary">{active.accentLabel}</span>
            </div>
            <h3 className="mt-2 font-headline text-xl font-normal leading-snug tracking-tight text-primary">
              {active.specimen.name}
            </h3>
            <p className="mt-1 font-headline text-base font-normal italic text-primary/75">
              {active.specimen.origin}
            </p>
            <p className="mt-1 label-text text-outline">
              {active.specimen.weight}
              {active.specimen.dimensions && ` · ${active.specimen.dimensions}`}
            </p>
            <p className="mt-4 font-body text-[14px] leading-[1.65] text-on-surface-variant line-clamp-3">
              {active.specimen.formationNotes}
            </p>
            <div className="mt-5 hairline-top pt-4">
              <Link
                href={`/collection/${active.specimen.slug}`}
                className="group inline-flex items-center gap-2 font-body text-[14px] text-on-surface underline underline-offset-4 decoration-[0.5px] decoration-outline/50 transition-colors hover:text-secondary"
              >
                View this piece
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Desktop layout: map + floating card + origin labels ── */}
        <div className="relative mt-16 hidden md:block" data-reveal>
          <div className="relative mx-auto aspect-[2/1] w-[95%]">
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
                    onMouseEnter={() => selectStop(s.specimen.slug)}
                    onFocus={() => selectStop(s.specimen.slug)}
                    onClick={() => selectStop(s.specimen.slug)}
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

          {/* Floating detail card */}
          <aside className="absolute left-0 top-0 max-w-[280px] lg:max-w-[320px]">
            <div
              key={active.specimen.slug}
              className="hero-fade-up hairline flex flex-col bg-background p-6"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-dim">
                <Image
                  src={active.specimen.images[0]}
                  alt={`${active.specimen.name} from ${active.specimen.origin} — ${active.specimen.weight} mineral specimen`}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                {active.specimen.tags.length > 0 && (
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {active.specimen.tags.map((tag) => <Tag key={tag} variant={tag} />)}
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-3">
                <span className="label-text text-outline">Now showing</span>
                <span className="label-text text-secondary">{active.accentLabel}</span>
              </div>
              <h3 className="mt-2 font-headline text-2xl font-normal leading-snug tracking-tight text-primary">
                {active.specimen.name}
              </h3>
              <p className="mt-2 font-headline text-base font-normal italic text-primary/75">
                {active.specimen.origin}
              </p>
              <p className="mt-1 label-text text-outline">
                {active.specimen.weight}
                {active.specimen.dimensions && ` · ${active.specimen.dimensions}`}
              </p>
              <p className="mt-4 font-body text-[14px] leading-[1.65] text-on-surface-variant line-clamp-3">
                {active.specimen.formationNotes}
              </p>
              <div className="mt-5 hairline-top pt-4">
                <Link
                  href={`/collection/${active.specimen.slug}`}
                  className="group inline-flex items-center gap-2 font-body text-[14px] text-on-surface underline underline-offset-4 decoration-[0.5px] decoration-outline/50 transition-colors hover:text-secondary"
                >
                  View this piece
                  <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Origin labels — desktop only */}
        <div className="mt-6 hidden flex-wrap gap-x-5 gap-y-2 md:flex">
          {stops.map((s) => {
            const isActive = s.specimen.slug === activeSlug;
            return (
              <button
                key={s.specimen.slug}
                type="button"
                onMouseEnter={() => selectStop(s.specimen.slug)}
                onFocus={() => selectStop(s.specimen.slug)}
                onClick={() => selectStop(s.specimen.slug)}
                className={cn(
                  'label-text transition-colors',
                  isActive ? 'text-secondary' : 'text-outline hover:text-primary'
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
