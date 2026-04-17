'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getAvailableSpecimens } from '@/data/queries';

export function InquiryForm({ defaultPiece }: { defaultPiece?: string }) {
  const specimens = getAvailableSpecimens();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    pieceOfInterest: defaultPiece || '',
    message: '',
  });

  const specimenOptions = [
    { value: '', label: 'General inquiry' },
    ...specimens.map((s) => ({ value: s.name, label: s.name })),
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface-container-low p-10 text-center">
        <p className="font-headline text-2xl font-light text-primary">
          Message received.
        </p>
        <p className="mt-2 font-body text-[13px] text-on-surface-variant">
          We will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Name"
          id="inq-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
        />
        <Input
          label="Email"
          id="inq-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="your@email.com"
        />
      </div>
      <Input
        label="Contact number (optional)"
        id="inq-contact"
        value={form.contact}
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
        placeholder="+63 9XX XXX XXXX"
      />
      <Select
        label="Piece of interest"
        id="inq-piece"
        options={specimenOptions}
        value={form.pieceOfInterest}
        onChange={(e) => setForm({ ...form, pieceOfInterest: e.target.value })}
        placeholder="Select a piece"
      />
      <Textarea
        label="Message"
        id="inq-message"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="What would you like to know?"
        rows={5}
      />
      {status === 'error' && (
        <p className="font-body text-[12px] text-error">
          Something went wrong. Please try again or message us directly.
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'loading'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}
