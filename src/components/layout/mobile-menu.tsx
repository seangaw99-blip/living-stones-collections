'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { gsap, useGSAP } from '@/lib/gsap-setup';

interface MobileMenuProps {
  links: { href: string; label: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const linkEls = linksRef.current?.querySelectorAll('li');
      if (!overlay || !linkEls) return;

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(linkEls, { autoAlpha: 0, y: 20 });

      tlRef.current = gsap
        .timeline({ paused: true })
        .to(overlay, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
        .to(
          linkEls,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: 'power3.out',
          },
          '-=0.1'
        );
    },
    { scope: overlayRef }
  );

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tlRef.current.reverse();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] bg-surface/95 backdrop-blur-2xl"
      style={{ pointerEvents: isOpen ? 'auto' : 'none', visibility: 'hidden' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 hairline-bottom">
        <div className="flex items-center gap-3">
          <Logo size={28} strokeWidth={2.5} />
          <span className="font-headline text-xl tracking-tight text-primary">
            The Living Stones Collections
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center text-primary transition-opacity duration-300 hover:opacity-70"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>
      </div>

      {/* Nav links */}
      <ul
        ref={linksRef}
        className="flex h-[70vh] flex-col items-start justify-center gap-4 px-8"
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="font-headline text-5xl italic font-light tracking-tight text-primary/80 transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom tagline */}
      <div className="absolute bottom-8 left-8">
        <p className="label-text text-on-surface-variant/50">
          Handpicked. Globally sourced.
        </p>
      </div>
    </div>
  );
}
