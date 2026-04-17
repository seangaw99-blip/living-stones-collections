import { NextRequest, NextResponse } from 'next/server';
import { videoCallSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = videoCallSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    console.log('[Video call booking received]', {
      from: data.name,
      email: data.email,
      piece: data.pieceOfInterest,
      date: data.preferredDate,
      time: data.preferredTime,
      platform: data.platform,
      message: data.message,
      receivedAt: new Date().toISOString(),
    });

    // TODO: Send confirmation email + owner notification

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
