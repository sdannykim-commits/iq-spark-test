import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
    : null;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ verified: false, error: 'No session ID' }, { status: 400 });
    }

    // Demo mode
    if (!stripe || sessionId.startsWith('demo')) {
        return NextResponse.json({
            verified: true,
            demo: true,
            orderId: `DEMO-${Date.now()}`,
        });
    }

    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // In production, also verify against database
            // const { data } = await supabase
            //   .from('payments')
            //   .select('*')
            //   .eq('stripe_session_id', sessionId)
            //   .single();

            return NextResponse.json({
                verified: true,
                orderId: session.id,
                email: session.customer_email,
                amount: session.amount_total,
                paidAt: new Date().toISOString(),
            });
        }

        return NextResponse.json({ verified: false, status: session.payment_status });
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json({ verified: false, error: 'Verification failed' }, { status: 500 });
    }
}
