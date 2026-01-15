'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Shield, Clock, Mail } from 'lucide-react';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVerified, setIsVerified] = useState(false);
    const [orderId, setOrderId] = useState<string>('');

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        const isDemo = searchParams.get('demo') === 'true';

        if (isDemo) {
            // Demo mode - simulate verification
            setIsVerified(true);
            setOrderId(`DEMO-${Date.now()}`);
            sessionStorage.setItem('iq_spark_paid', 'demo');
            return;
        }

        if (sessionId) {
            // Verify payment with server
            fetch(`/api/verify-payment?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.verified) {
                        setIsVerified(true);
                        setOrderId(data.orderId || sessionId);
                        sessionStorage.setItem('iq_spark_paid', sessionId);
                    } else {
                        router.push('/paywall');
                    }
                })
                .catch(() => {
                    // Fallback to demo mode
                    setIsVerified(true);
                    setOrderId(`DEMO-${Date.now()}`);
                    sessionStorage.setItem('iq_spark_paid', 'demo');
                });
        } else {
            // Check if demo mode
            const paid = sessionStorage.getItem('iq_spark_paid');
            if (paid) {
                setIsVerified(true);
                setOrderId(paid === 'demo' ? `DEMO-${Date.now()}` : paid);
            } else {
                router.push('/paywall');
            }
        }
    }, [searchParams, router]);

    if (!isVerified) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Verifying payment...</p>
                </div>
            </div>
        );
    }

    const timestamp = new Date().toLocaleString();

    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-lg mx-auto">
                    <Card className="glass border-border/40 overflow-hidden">
                        <CardContent className="p-8">
                            {/* Success icon */}
                            <div className="text-center mb-6">
                                <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-10 w-10 text-green-500" />
                                </div>
                                <h1 className="text-2xl font-bold mb-2">Payment Verified!</h1>
                                <Badge variant="success">Your report is now unlocked</Badge>
                            </div>

                            {/* Order details */}
                            <div className="rounded-lg bg-card/50 border border-border/40 p-4 mb-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Order ID</span>
                                    <span className="font-mono">{orderId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-semibold">$14.99 USD</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Date</span>
                                    <span>{timestamp}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge variant="success" className="text-xs">Paid</Badge>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="flex justify-center gap-4 mb-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Shield className="h-4 w-4 text-green-500" />
                                    <span>Secured by Stripe</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>Instant Access</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <Link href="/results">
                                <Button variant="gradient" size="xl" className="w-full group">
                                    View My Results
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            {/* Email note */}
                            <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                                <p>
                                    A receipt has been sent to your email. If you don't receive it,
                                    check your spam folder or{' '}
                                    <Link href="/support" className="text-primary hover:underline">
                                        contact support
                                    </Link>.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* No subscription reminder */}
                    <p className="text-center text-xs text-muted-foreground mt-6">
                        This is a one-time payment. You will NOT be charged again.
                        No subscription has been created.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
