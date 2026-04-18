'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getAvailableSpecimens } from '@/data/queries';

const platformOptions = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'google-meet', label: 'Google Meet' },
  { value: 'messenger', label: 'Messenger' },
];

const timeOptions = [
  { value: '10:00', label: '10:00 AM PHT' },
  { value: '11:00', label: '11:00 AM PHT' },
  { value: '13:00', label: '1:00 PM PHT' },
  { value: '14:00', label: '2:00 PM PHT' },
  { value: '15:00', label: '3:00 PM PHT' },
  { value: '16:00', label: '4:00 PM PHT' },
  { value: '17:00', label: '5:00 PM PHT' },
];

export function VideoCallForm() {
  const specimens = getAvailableSpecimens();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    pieceOfInterest: '',
    preferredDate: '',
    preferredTime: '',
    platform: 'zoom',
    message: '',
  });

  const specimenOptions = [
    { value: '', label: 'No specific piece' },
    ...specimens.map((s) => ({ value: s.name, label: s.name })),
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/video-call', {
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
        <p className="font-headline text-2xl font-normal text-primary">
          Booking received.
        </p>
        <p className="mt-2 font-body text-[14px] text-on-surface-variant">
          We will confirm your time and send a meeting link within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Name"
          id="vc-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
        />
        <Input
          label="Email"
          id="vc-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="your@email.com"
        />
      </div>
      <Select
        label="Piece of interest"
        id="vc-piece"
        options={specimenOptions}
        value={form.pieceOfInterest}
        onChange={(e) => setForm({ ...form, pieceOfInterest: e.target.value })}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Preferred date"
          id="vc-date"
          type="date"
          required
          value={form.preferredDate}
          onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
        />
        <Select
          label="Preferred time (PHT)"
          id="vc-time"
          required
          options={timeOptions}
          value={form.preferredTime}
          onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
          placeholder="Select a time"
        />
      </div>
      <Select
        label="Platform"
        id="vc-platform"
        required
        options={platformOptions}
        value={form.platform}
        onChange={(e) => setForm({ ...form, platform: e.target.value })}
      />
      <Textarea
        label="Anything else (optional)"
        id="vc-message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Questions, preferences, or notes..."
        rows={3}
      />
      <p className="label-text text-outline">
        Available Monday&ndash;Saturday &middot; Philippines time (PHT)
      </p>
      {status === 'error' && (
        <p className="font-body text-[12px] text-error">
          Something went wrong. Please try again.
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'loading'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? 'Booking...' : 'Request a call'}
      </Button>
    </form>
  );
}
