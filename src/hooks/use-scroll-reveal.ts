'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';

interface ScrollRevealOptions {
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}

/**
 * Batch-reveals a list of elements as they enter the viewport.
 * Usage: pass the return value as `ref` on a container, then
 * add `data-reveal` to each child you want animated.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    stagger = 0.1,
    y = 16,
    duration = 0.7,
    start = 'top 88%',
    once = true,
  } = options;

  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const elements = container.querySelectorAll('[data-reveal]');
      if (!elements.length) return;

      // Set initial state
      gsap.set(elements, { autoAlpha: 0, y });

      ScrollTrigger.batch(elements, {
        start,
        once,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration,
            stagger,
            ease: 'power3.out',
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

/**
 * Wraps a single element in a scroll-triggered fade-up.
 */
export function useFadeUp(options: Omit<ScrollRevealOptions, 'stagger'> = {}) {
  const { y = 20, duration = 0.8, start = 'top 90%', once = true } = options;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.set(el, { autoAlpha: 0, y });

      ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () => {
          gsap.to(el, { autoAlpha: 1, y: 0, duration, ease: 'power3.out' });
        },
      });
    },
    { scope: ref }
  );

  return ref;
}
