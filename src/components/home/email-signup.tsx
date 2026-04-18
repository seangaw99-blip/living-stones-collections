'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-primary-container py-32 md:py-40">
      <Container size="narrow">
        <div className="text-center" data-reveal>
          <span className="label-text text-secondary tracking-[0.2em]">New arrivals</span>
          <h2 className="mt-6 font-headline font-medium leading-[0.92] tracking-[-0.03em] text-on-primary text-[clamp(44px,7vw,120px)]">
            Be first
            <br />
            <span className="italic font-light text-on-primary/55">to know.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md font-body text-[17px] leading-[1.7] text-on-primary/70">
            Rare pieces move fast. Join the list and get notified when new
            specimens arrive &mdash; before they are listed publicly.
          </p>

          {status === 'success' ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border-[0.5px] border-secondary/70 bg-surface-container-highest px-6 py-3 font-body text-[14px] text-secondary">
              You&apos;re on the list.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-12 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 border-b-[1px] border-on-primary/40 bg-transparent px-2 py-4 font-body text-[17px] text-on-primary outline-none transition-colors placeholder:text-on-primary/40 focus:border-secondary"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 bg-secondary px-8 py-4 font-body text-[14px] font-semibold tracking-[0.1em] uppercase text-on-primary transition-colors hover:bg-on-primary hover:text-primary disabled:opacity-40"
              >
                {status === 'loading' ? 'Joining...' : 'Join the list'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 font-body text-[13px] text-error">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="mt-8 label-text text-on-primary/40 tracking-[0.2em]">
            No newsletters. Only new arrivals.
          </p>
        </div>
      </Container>
    </section>
  );
}
