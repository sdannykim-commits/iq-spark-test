import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
    : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    if (!stripe || !webhookSecret) {
        console.log('Webhook received but Stripe not configured');
        return NextResponse.json({ received: true, demo: true });
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            console.log('Payment completed:', {
                sessionId: session.id,
                attemptId: session.metadata?.attempt_id,
                email: session.customer_email,
                amount: session.amount_total,
            });

            // In production, update database:
            // await supabase.from('payments').insert({
            //   attempt_id: session.metadata?.attempt_id,
            //   stripe_session_id: session.id,
            //   stripe_payment_intent_id: session.payment_intent,
            //   amount_cents: session.amount_total,
            //   status: 'completed',
            //   email: session.customer_email,
            //   paid_at: new Date().toISOString(),
            // });
            // 
            // await supabase.from('attempts')
            //   .update({ report_unlocked: true })
            //   .eq('id', session.metadata?.attempt_id);

            break;
        }

        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('PaymentIntent succeeded:', paymentIntent.id);
            break;
        }

        case 'charge.refunded': {
            const charge = event.data.object as Stripe.Charge;
            console.log('Charge refunded:', charge.id);

            // In production, update database:
            // await supabase.from('payments')
            //   .update({ status: 'refunded', refunded_at: new Date().toISOString() })
            //   .eq('stripe_payment_intent_id', charge.payment_intent);
            // 
            // await supabase.from('attempts')
            //   .update({ report_unlocked: false })
            //   .eq('id', attemptId);

            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
