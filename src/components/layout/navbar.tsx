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

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > SCROLL_THRESHOLD);
    };
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
            ? 'bg-surface/85 backdrop-blur-md hairline-bottom'
            : 'bg-transparent'
        )}
      >
        <div className="relative mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4 md:px-8">
          {/* Brand — left */}
          <Link
            href="/"
            aria-label="The Living Stones Collections — Home"
            className="relative z-10 flex items-center transition-opacity duration-300 hover:opacity-70"
          >
            <Logo size={32} strokeWidth={2.5} />
          </Link>

          {/* Desktop nav — absolutely centered in the bar */}
          <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-headline italic text-lg capitalize tracking-tight transition-all duration-300 hover:opacity-70',
                    active
                      ? 'text-primary font-medium border-b border-outline/50'
                      : 'text-on-surface-variant'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="relative z-10 flex items-center gap-2">
            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="flex h-10 w-10 items-center justify-center text-primary transition-opacity duration-300 hover:opacity-70"
            >
              <span className="material-symbols-outlined text-[22px]">
                shopping_bag
              </span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-1 text-primary transition-opacity duration-300 hover:opacity-70 md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-[1px] w-5 bg-current" />
              <span className="block h-[1px] w-5 bg-current" />
            </button>
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
