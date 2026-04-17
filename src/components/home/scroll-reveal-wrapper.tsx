'use client';

import { useRef } from 'react';
import { useGSAP } from '@/lib/gsap-setup';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export function ScrollRevealWrapper({
  children,
  className,
  stagger = 0.1,
}: ScrollRevealWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = containerRef.current?.querySelectorAll('[data-reveal]');
      if (!elements?.length) return;

      gsap.set(elements, { autoAlpha: 0, y: 16 });

      ScrollTrigger.batch(elements, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger,
            ease: 'power3.out',
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
