import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Log to console for now — replace with email service (Resend, etc.)
    console.log('[Inquiry received]', {
      from: data.name,
      email: data.email,
      contact: data.contact,
      piece: data.pieceOfInterest,
      message: data.message,
      receivedAt: new Date().toISOString(),
    });

    // TODO: Send email notification to owner
    // await sendEmail({ to: process.env.OWNER_EMAIL, subject: `Inquiry from ${data.name}`, ... })

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
