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
      className="relative h-[100dvh] w-full overflow-hidden bg-primary-container"
    >
      {/* ═══ Split-screen: image left (60%) on dark gallery wall, text right (40%) on warm white ═══ */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr]">

        {/* LEFT — specimen image on dark gallery wall */}
        <div className="relative overflow-hidden bg-primary-container">
          {/* Ambient accent tint */}
          <div
            ref={accentRef}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 55%, ${stop.accentHex}30 0%, transparent 70%)`,
            }}
            aria-hidden
          />

          {/* Specimen images — stacked, crossfade */}
          <div ref={imagesRef} className="absolute inset-0 flex items-center justify-center">
            {stops.map((s, i) => (
              <div
                key={s.specimen.slug}
                data-hero-img
                data-active={i === activeIndex}
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  i === activeIndex ? 'opacity-100' : 'opacity-0',
                  'transition-opacity duration-700 ease-out md:transition-none'
                )}
                style={{ willChange: 'transform, opacity, filter' }}
              >
                <Image
                  src={s.heroImage}
                  alt={`${s.specimen.name} — ${s.specimen.origin}`}
                  width={1200}
                  height={1600}
                  priority={i === 0}
                  className="h-[70vh] max-h-[900px] w-auto object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            ))}
          </div>

          {/* Counter — top-left over dark bg */}
          <div className="absolute top-8 left-8 z-10 md:top-10 md:left-10">
            <span className="label-text text-on-primary/60 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')}
              <span className="mx-2">/</span>
              {String(count).padStart(2, '0')}
            </span>
          </div>

          {/* Accent label — bottom-left over dark bg */}
          <div className="absolute bottom-8 left-8 z-10 md:bottom-10 md:left-10">
            <span className="label-text text-secondary tracking-[0.2em]">
              {stop.accentLabel}
            </span>
          </div>

          {/* Progress dots — bottom-center over image */}
          <div
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 md:bottom-10"
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
                  'h-1 rounded-full transition-all duration-500 ease-out',
                  i === activeIndex
                    ? 'w-16 bg-secondary'
                    : 'w-8 bg-on-primary/25 hover:bg-on-primary/50'
                )}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — warm-white column with giant brand + specimen info */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-background px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">

          {/* Massive brand wordmark — top, stacked "LIVING / STONES" */}
          <div className="pointer-events-none" aria-hidden>
            <span className="block font-headline font-normal text-primary leading-[0.85] tracking-[-0.04em] text-[clamp(56px,13vw,180px)]">
              Living
            </span>
            <span className="block font-headline italic font-light text-secondary leading-[0.85] tracking-[-0.02em] text-[clamp(56px,13vw,180px)]">
              Stones.
            </span>
            <span className="mt-4 block label-text text-outline md:mt-6">
              Est. Manila &middot; PH
            </span>
          </div>

          {/* Accessible brand heading */}
          <h2 className="sr-only">The Living Stones Collections</h2>

          {/* Specimen info + CTA — bottom */}
          <div key={`info-${stop.specimen.slug}`} className="hero-fade-up mt-10 md:mt-0">
            <div className="mb-5 h-[0.5px] w-12 bg-secondary md:mb-8 md:w-16" />
            <h1 className="font-headline font-medium leading-[0.95] tracking-[-0.02em] text-primary text-[clamp(32px,5vw,72px)]">
              {stop.specimen.name}
            </h1>
            <p className="mt-3 font-headline text-lg font-normal italic text-primary/75 md:mt-4 md:text-xl">
              from {stop.specimen.origin}
            </p>
            <p className="mt-2 label-text text-outline">
              {stop.specimen.weight}
              {stop.specimen.dimensions && ` · ${stop.specimen.dimensions}`}
            </p>

            <Link
              href={`/collection/${stop.specimen.slug}`}
              aria-label={`View ${stop.specimen.name} — mineral specimen`}
              className="group mt-8 inline-flex items-center gap-3 bg-primary px-7 py-4 text-on-primary transition-colors hover:bg-secondary md:mt-10"
            >
              <span className="font-body text-[14px] font-semibold tracking-[0.1em] uppercase">
                View this piece
              </span>
              <span
                className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
