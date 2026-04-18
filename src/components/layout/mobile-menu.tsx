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

// Premium luxury easing — GSAP CustomEase equivalent of cubic-bezier(0.22, 1, 0.36, 1)
const EASE_OUT_EXPO = 'power4.out';
const EASE_IN_OUT = 'power3.inOut';

export function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const linkEls = linksRef.current?.querySelectorAll('li');
      const topBar = topBarRef.current;
      const tagline = taglineRef.current;
      if (!overlay || !panel || !linkEls || !topBar || !tagline) return;

      // Initial hidden state
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(panel, { autoAlpha: 0, y: -12 });
      gsap.set(topBar, { autoAlpha: 0, y: -8 });
      gsap.set(linkEls, { autoAlpha: 0, y: 32 });
      gsap.set(tagline, { autoAlpha: 0, y: 12 });

      tlRef.current = gsap
        .timeline({ paused: true, defaults: { ease: EASE_OUT_EXPO } })
        // 1. Scrim fades in first — longer, smoother
        .to(overlay, { autoAlpha: 1, duration: 0.45, ease: EASE_IN_OUT })
        // 2. Panel (inner content container) eases in with slight drop from top
        .to(panel, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.3')
        // 3. Top bar slides in
        .to(topBar, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.5')
        // 4. Links cascade in one by one
        .to(
          linkEls,
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 },
          '-=0.35'
        )
        // 5. Tagline fades in last
        .to(tagline, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.3');
    },
    { scope: overlayRef }
  );

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.timeScale(1).play();
      document.body.style.overflow = 'hidden';
    } else {
      tlRef.current.timeScale(1.4).reverse();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] bg-primary-container/88 backdrop-blur-2xl"
      style={{ pointerEvents: isOpen ? 'auto' : 'none', visibility: 'hidden' }}
    >
      <div ref={panelRef} className="relative flex h-full w-full flex-col">
        {/* Top bar */}
        <div
          ref={topBarRef}
          className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6"
        >
          <div className="flex items-center gap-3 text-on-primary">
            <Logo size={28} strokeWidth={2.5} />
            <span className="font-headline text-lg font-medium tracking-[-0.01em] md:text-xl">
              Living Stones
            </span>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2.5 font-body text-[13px] font-medium uppercase tracking-[0.2em] text-on-primary transition-colors hover:text-secondary"
            aria-label="Close menu"
          >
            <span className="underline underline-offset-[8px] decoration-[0.5px] decoration-on-primary/40 transition-colors group-hover:decoration-secondary">
              Close
            </span>
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Nav links */}
        <ul
          ref={linksRef}
          className="flex flex-1 flex-col items-start justify-center gap-3 px-6 md:px-16"
        >
          {links.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                className="group block font-headline font-normal leading-[0.95] tracking-[-0.03em] text-on-primary transition-colors duration-300 hover:text-secondary text-[clamp(40px,7vw,112px)]"
              >
                <span className="italic font-light">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom tagline */}
        <div
          ref={taglineRef}
          className="flex items-end justify-between gap-6 px-6 pb-10 md:px-10 md:pb-14"
        >
          <p className="max-w-xs font-body text-[14px] leading-[1.6] text-on-primary/60">
            Handpicked. Globally sourced. Manila-based.
          </p>
          <p className="label-text text-secondary tracking-[0.22em]">
            Est. PH
          </p>
        </div>
      </div>
    </div>
  );
}
