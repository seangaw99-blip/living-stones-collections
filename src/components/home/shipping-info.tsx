import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function ShippingInfo() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — intro */}
          <div data-reveal className="lg:col-span-4">
            <span className="label-text text-outline">Delivery</span>
            <h2 className="mt-4 font-headline text-4xl font-light leading-[1.08] tracking-tight text-primary md:text-5xl">
              Packed slowly. Arrives safely.
            </h2>
            <p className="mt-6 max-w-xs font-body text-[14px] leading-[1.7] text-on-surface-variant">
              Every specimen travels wrapped, foamed, and double-boxed. We ship
              when the packing is right, not when the label is printed.
            </p>
          </div>

          {/* Right — primary PH shipping */}
          <div
            data-reveal
            className="bg-surface-container-low p-10 md:p-14 rounded-xl lg:col-span-8"
          >
            <div className="flex items-baseline justify-between gap-6">
              <span className="label-text text-outline">
                Philippines &mdash; Nationwide
              </span>
              <span className="label-text text-outline">
                2&ndash;5 days transit
              </span>
            </div>

            <h3 className="mt-5 max-w-md font-headline text-2xl font-light leading-snug tracking-tight text-primary md:text-3xl">
              Ships from Manila to anywhere in the archipelago.
            </h3>

            <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {[
                'Fully insured transit with signature on delivery',
                'Foam-lined, shock-absorbent crates',
                'Optional Manila showroom pickup',
                'Photographed at each handoff point',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-secondary/70" />
                  <p className="font-body text-[13px] leading-[1.7] text-on-surface-variant">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href="/shipping"
              className="mt-10 inline-flex items-center gap-2 font-body text-[13px] text-outline underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
            >
              Full shipping details
              <span className="material-symbols-outlined text-[16px]" aria-hidden>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* International — inline strip */}
        <div
          data-reveal
          className="mt-10 flex flex-col items-start justify-between gap-6 border-t-[0.5px] border-outline-variant/40 pt-10 sm:flex-row sm:items-center"
        >
          <div className="flex items-baseline gap-4">
            <span className="label-text text-outline">International</span>
            <p className="font-headline text-lg font-light italic text-on-surface">
              Quoted per piece, per destination.
            </p>
          </div>
          <Link
            href="/inquire"
            className="inline-flex items-center gap-2 font-body text-[13px] text-on-surface underline underline-offset-4 decoration-[0.5px] decoration-outline/50 transition-colors hover:text-secondary"
          >
            Send an inquiry
            <span className="material-symbols-outlined text-[16px]" aria-hidden>
              arrow_forward
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
