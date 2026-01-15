import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe (will be undefined if key not set)
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
    : null;

export async function POST(request: NextRequest) {
    try {
        // Check if Stripe is configured
        if (!stripe) {
            // Demo mode - redirect to success without real payment
            return NextResponse.json({
                url: '/payment/success?demo=true',
                demo: true
            });
        }

        const { attemptId } = await request.json();
        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'payment', // One-time payment, NOT subscription
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'IQ Spark — Premium Result Report',
                            description: 'One-time payment. Unlock your full IQ test results, percentile ranking, and cognitive strengths analysis. NO subscription.',
                            images: [`${origin}/og-image.png`],
                        },
                        unit_amount: 1499, // $14.99 in cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                attempt_id: attemptId || 'unknown',
                product: 'iq_spark_report',
                no_subscription: 'true', // Explicit marker
            },
            customer_creation: 'if_required',
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/payment/cancelled`,
            // Strong anti-subscription messaging
            custom_text: {
                submit: {
                    message: 'One-time payment of $14.99. NO subscription will be created. You will NOT be charged again.',
                },
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
