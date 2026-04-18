'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/collection', label: 'Collection' },
  { href: '/about', label: 'About' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/sold-archive', label: 'Archive' },
  { href: '/contact', label: 'Contact' },
];

const SCROLL_THRESHOLD = 80;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const pathname = usePathname();

  // Inverted (light text) when at top of homepage — over the dark-left half of the split hero
  const isHome = pathname === '/';
  const inverted = isHome && !shown;

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full',
          'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          shown
            ? 'bg-background/90 backdrop-blur-md hairline-bottom'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-5 md:px-10 md:py-6">
          {/* Brand wordmark — left */}
          <Link
            href="/"
            aria-label="The Living Stones Collections — Home"
            className={cn(
              'flex items-center gap-3 transition-opacity duration-500 hover:opacity-70',
              inverted ? 'text-on-primary' : 'text-primary'
            )}
          >
            <Logo size={28} strokeWidth={2.5} />
            <span className="font-headline text-lg font-medium tracking-[-0.01em] md:text-xl">
              Living Stones
            </span>
          </Link>

          {/* Menu + Cart — right (always dark, sits over warm-white right half of hero) */}
          <div className="flex items-center gap-6 text-primary md:gap-8">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="group flex items-center gap-2.5 font-body text-[13px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-secondary"
            >
              <span className="underline underline-offset-[8px] decoration-[0.5px] decoration-outline/50 transition-colors group-hover:decoration-secondary">
                Menu
              </span>
              <span className="flex flex-col gap-[3px]" aria-hidden>
                <span className="block h-[1.5px] w-4 bg-current" />
                <span className="block h-[1.5px] w-4 bg-current" />
              </span>
            </button>

            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="flex h-10 w-10 items-center justify-center transition-colors hover:text-secondary"
            >
              <span className="material-symbols-outlined text-[22px]">
                shopping_bag
              </span>
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu
        links={navLinks}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
