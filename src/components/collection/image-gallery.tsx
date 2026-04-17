'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap-setup';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: mainRef });

  const switchImage = contextSafe((index: number) => {
    if (index === active) return;
    const img = mainRef.current?.querySelector('.main-image') as HTMLElement;
    if (!img) return;

    gsap.to(img, {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActive(index);
        gsap.to(img, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      },
    });
  });

  const hasImages = images.length > 0 && images[0];

  return (
    <div ref={mainRef} className="space-y-4">
      {/* Main image */}
      <div
        className="main-image relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-surface-dim lg:aspect-auto lg:h-[800px]"
      >
        {hasImages ? (
          <Image
            src={images[active]}
            alt={`${name} — view ${active + 1}`}
            fill
            className="object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-surface-container-high" />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => switchImage(i)}
              className={cn(
                'relative h-16 w-16 overflow-hidden bg-surface-dim transition-all duration-200',
                i === active
                  ? 'ring-2 ring-secondary/70'
                  : 'hairline opacity-60 hover:opacity-90'
              )}
              aria-label={`View image ${i + 1}`}
            >
              {img && (
                <Image
                  src={img}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="64px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
