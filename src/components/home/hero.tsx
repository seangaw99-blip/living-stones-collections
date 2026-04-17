'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, useGSAP } from '@/lib/gsap-setup';
import { getFeaturedHeroStops } from '@/data/featured-hero';
import { cn } from '@/lib/utils';

const stops = getFeaturedHeroStops();
const count = stops.length;

// Cycle interval per specimen (ms)
const CYCLE_MS = 6000;
// Pause auto-advance for this long after a manual interaction (ms)
const INTERACTION_LOCK_MS = 8000;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  // Auto-advance state
  const intervalRef = useRef<number | null>(null);
  const lockUntilRef = useRef(0);
  const inViewRef = useRef(false);
  const hoveredRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  // Preload all hero images
  useEffect(() => {
    stops.forEach((stop) => {
      const img = new window.Image();
      img.src = stop.heroImage;
    });
  }, []);

  // Auto-advance driver — runs continuously while hero is visible + not hovered + not locked
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
      const now = Date.now();
      if (
        !inViewRef.current ||
        hoveredRef.current ||
        now < lockUntilRef.current
      ) {
        return;
      }
      setActiveIndex((i) => (i + 1) % count);
    };

    intervalRef.current = window.setInterval(tick, CYCLE_MS);

    return () => {
      observer.disconnect();
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  // Hover pause (desktop) + touch pause (mobile) on the section itself
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onEnter = () => {
      hoveredRef.current = true;
    };
    const onLeave = () => {
      hoveredRef.current = false;
    };
    const onTouch = () => {
      lockUntilRef.current = Date.now() + INTERACTION_LOCK_MS;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchstart', onTouch, { passive: true });
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchstart', onTouch);
    };
  }, []);

  // Per-index choreography — runs when activeIndex changes (not on first mount)
  useGSAP(
    () => {
      if (!mountedRef.current) {
        mountedRef.current = true;
        return;
      }

      const stop = stops[activeIndex];
      if (!stop) return;

      // Image crossfade with scale + blur
      const images = imagesRef.current?.querySelectorAll<HTMLElement>(
        '[data-hero-img]'
      );
      if (images) {
        images.forEach((img, i) => {
          if (i === activeIndex) {
            gsap.to(img, {
              autoAlpha: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          } else {
            gsap.to(img, {
              autoAlpha: 0,
              scale: 0.94,
              filter: 'blur(6px)',
              duration: 0.7,
              ease: 'power2.in',
              overwrite: 'auto',
            });
          }
        });
      }

      // Ambient accent tint
      if (accentRef.current) {
        gsap.to(accentRef.current, {
          backgroundColor: `${stop.accentHex}14`,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    },
    { dependencies: [activeIndex] }
  );

  // Initial image visibility — only first is visible, others pre-hidden for GSAP transitions
  useGSAP(
    () => {
      const images = imagesRef.current?.querySelectorAll<HTMLElement>(
        '[data-hero-img]'
      );
      if (!images) return;
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (reduceMotion) return;
      gsap.set(images, { autoAlpha: 0, scale: 0.94, filter: 'blur(6px)' });
      gsap.set(images[0], { autoAlpha: 1, scale: 1, filter: 'blur(0px)' });
    },
    { scope: sectionRef }
  );

  // Manual jump — reset the interaction lock so the next auto-tick waits
  const jumpTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(count - 1, index));
    setActiveIndex(clamped);
    lockUntilRef.current = Date.now() + INTERACTION_LOCK_MS;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && target.matches('input, textarea, select, [contenteditable]'))
        return;
      if (!inViewRef.current) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        jumpTo((activeIndex + 1) % count);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        jumpTo((activeIndex - 1 + count) % count);
      } else if (/^[1-6]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < count) jumpTo(idx);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, jumpTo]);

  const stop = stops[activeIndex];
  if (!stop) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden"
    >
      {/* Ambient accent tint — changes per specimen */}
      <div
        ref={accentRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${stop.accentHex}14 0%, transparent 65%)`,
        }}
        aria-hidden
      />

      {/* All specimen images stacked — only active is visible */}
      <div
        ref={imagesRef}
        className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center"
        aria-hidden
      >
        {stops.map((s, i) => (
          <div
            key={s.specimen.slug}
            data-hero-img
            data-active={i === activeIndex}
            className={cn(
              'absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2',
              i === activeIndex ? 'opacity-100' : 'opacity-0',
              'transition-opacity duration-700 ease-out md:transition-none'
            )}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <Image
              src={s.heroImage}
              alt={`${s.specimen.name} — ${s.specimen.origin}`}
              width={896}
              height={1200}
              priority={i === 0}
              className="h-[54vh] w-auto max-h-[640px] min-h-[340px] object-contain drop-shadow-[0_12px_28px_rgba(58,53,48,0.05)]"
              sizes="(max-width: 1024px) 60vw, 42vw"
            />
          </div>
        ))}
      </div>

      {/* Brand display — top center, mineral overlaps only the bottom of "Collections" */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-start pt-24 md:pt-28 lg:pt-32"
        aria-hidden
      >
        <span className="font-headline font-light text-primary leading-[0.9] tracking-[-0.04em] text-[clamp(72px,17.5vw,320px)] text-center break-words">
          Living Stones
        </span>
      </div>

      {/* Accessible brand heading for SEO/screen readers */}
      <h2 className="sr-only">The Living Stones Collections</h2>

      {/* Content overlay */}
      <div className="absolute inset-0 z-20">

        {/* Specimen block — bottom-left, combines name + origin + details */}
        <div
          key={`info-${stop.specimen.slug}`}
          className="hero-fade-up absolute bottom-16 left-6 max-w-md md:bottom-20 md:left-8 lg:left-12"
        >
          <span className="label-text text-outline tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(count).padStart(2, '0')}
            <span className="ml-3 text-primary">
              &middot; {stop.accentLabel}
            </span>
          </span>
          <h1 className="mt-3 font-headline text-3xl font-light leading-tight tracking-tight text-primary md:text-4xl lg:text-5xl">
            {stop.specimen.name}
          </h1>
          <p className="mt-3 font-headline text-lg font-light italic text-primary/80 md:text-xl">
            {stop.specimen.origin}
          </p>
          <p className="mt-1 label-text text-outline">
            {stop.specimen.weight}
            {stop.specimen.dimensions && ` · ${stop.specimen.dimensions}`}
          </p>
        </div>

        {/* CTA — bottom-right */}
        <div className="absolute bottom-20 right-6 md:bottom-24 md:right-8 lg:right-12">
          <Link
            href={`/collection/${stop.specimen.slug}`}
            aria-label={`View ${stop.specimen.name} — mineral specimen`}
            className="group inline-flex items-center gap-3 rounded-lg bg-primary-container px-6 py-3 text-on-primary transition-colors hover:bg-primary"
          >
            <span className="font-body text-[13px] font-medium tracking-wide">
              View this piece
            </span>
            <span
              className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            >
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Progress dots — bottom center */}
        <div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3"
          role="tablist"
          aria-label="Specimen showcase"
        >
          {stops.map((s, i) => (
            <button
              key={s.specimen.slug}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show ${s.specimen.name}`}
              onClick={() => jumpTo(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500 ease-out',
                i === activeIndex
                  ? 'w-12 bg-primary'
                  : 'w-6 bg-outline-variant hover:bg-outline'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
