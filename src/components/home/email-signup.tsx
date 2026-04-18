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
    <section className="bg-surface-container-low py-20 md:py-24">
      <Container size="narrow">
        <div className="text-center" data-reveal>
          <span className="label-text text-secondary">New arrivals</span>
          <h2 className="mt-4 font-headline text-4xl font-normal leading-[1.1] tracking-tight text-primary md:text-5xl">
            Be first to know.
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-body text-[15px] leading-[1.7] text-on-surface-variant">
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
              className="mx-auto mt-8 flex max-w-sm flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="hairline flex-1 rounded-lg bg-surface-container-lowest px-4 py-3 font-body text-[15px] text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-secondary"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={status === 'loading'}
                className="shrink-0"
              >
                {status === 'loading' ? 'Joining...' : 'Join the list'}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 font-body text-[12px] text-error">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="mt-5 label-text text-outline">
            No newsletters. Only new arrivals.
          </p>
        </div>
      </Container>
    </section>
  );
}
