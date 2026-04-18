'use client';

import { useCart } from '@/hooks/use-cart';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, cartTotal, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-16 pb-24 md:pt-24">
        <Container size="narrow">
          <div className="py-20 text-center">
            <h1 className="font-headline text-4xl font-normal tracking-tight text-primary">
              Your cart is empty.
            </h1>
            <p className="mt-3 font-body text-[15px] text-on-surface-variant">
              Browse the collection to find a piece.
            </p>
            <div className="mt-10">
              <Link href="/collection">
                <Button variant="primary">View collection</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-24 md:pt-24">
      <Container size="narrow">
        <h1 className="mb-12 font-headline text-5xl font-normal leading-tight tracking-tight text-primary">
          Your cart.
        </h1>

        <div>
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-5 border-b-[0.5px] border-outline-variant/40 py-6 first:border-t-[0.5px] first:border-t-outline-variant/40"
            >
              {/* Image */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-dim">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <h3 className="font-headline text-xl font-normal text-primary">
                  {item.name}
                </h3>
                <p className="mt-1 label-text text-outline">{item.origin}</p>
              </div>

              {/* Price */}
              <p className="shrink-0 font-body text-[15px] text-primary">
                &#8369;{item.price.toLocaleString()}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.slug)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-outline transition-colors hover:bg-surface-container-high"
                aria-label={`Remove ${item.name}`}
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden>
                  close
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Total + CTA */}
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="label-text text-outline">Total</span>
            <span className="font-headline text-3xl font-normal text-primary">
              &#8369;{cartTotal.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to checkout
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={clearCart}
            >
              Clear cart
            </Button>
          </div>

          <p className="mt-6 text-center font-body text-[12px] text-on-surface-variant">
            International orders?{' '}
            <Link
              href="/inquire"
              className="text-secondary underline underline-offset-4 hover:opacity-80"
            >
              Inquire first
            </Link>{' '}
            &mdash; we confirm rates before payment.
          </p>
        </div>
      </Container>
    </div>
  );
}
