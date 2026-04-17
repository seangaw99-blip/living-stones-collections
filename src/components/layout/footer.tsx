import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export function Footer() {
  return (
    <footer className="mt-24 w-full bg-stone-900 text-stone-200">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-8 py-20 md:grid-cols-3 md:px-12">
        {/* Brand + copyright */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <Logo size={32} strokeWidth={2.5} />
            <h2 className="font-headline text-xl font-light text-stone-50">
              The Living Stones Collections
            </h2>
          </div>
          <p className="mb-6 max-w-xs text-[13px] leading-relaxed text-stone-400/80">
            Curated geological art. Rare mineral specimens for collectors who value what lasts.
          </p>
          {/* NAP block — Local SEO signal */}
          <address className="not-italic mb-8 text-[12px] leading-relaxed text-stone-500 space-y-0.5">
            <span className="block">Manila, Philippines</span>
            <a
              href="mailto:hello@livingstonescollections.com"
              className="block transition-colors hover:text-stone-300"
            >
              hello@livingstonescollections.com
            </a>
            <span className="block">Mon–Sat · 10:00 AM – 6:00 PM PHT</span>
          </address>
          <p className="mt-auto label-text text-stone-500">
            &copy; {new Date().getFullYear()} The Living Stones Collections.
          </p>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-4">
          <h4 className="label-text text-stone-50">Explore</h4>
          <Link href="/collection" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Collection
          </Link>
          <Link href="/about" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            About
          </Link>
          <Link href="/shipping" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Shipping
          </Link>
          <Link href="/sold-archive" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Archive
          </Link>
        </div>

        {/* Contact + Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="label-text text-stone-50">Contact &amp; Legal</h4>
          <Link href="/contact" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Contact
          </Link>
          <Link href="/inquire" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Inquire
          </Link>
          <Link href="/inquire#video-call" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Book a video call
          </Link>
          <Link href="/terms" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Terms
          </Link>
          <Link href="/privacy" className="label-text text-stone-400 transition-colors hover:text-stone-50">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
