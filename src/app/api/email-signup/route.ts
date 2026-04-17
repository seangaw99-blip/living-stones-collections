import { NextRequest, NextResponse } from 'next/server';
import { emailSignupSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = emailSignupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    console.log('[Email signup]', {
      email,
      signedUpAt: new Date().toISOString(),
    });

    // TODO: Add to Mailchimp / Klaviyo / Resend audience
    // await addToEmailList(email)

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
