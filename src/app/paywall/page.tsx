'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TestResult } from '@/lib/questions/types';
import {
    Lock,
    CheckCircle,
    CreditCard,
    Shield,
    ArrowRight,
    Brain,
    BarChart3,
    FileText,
    Sparkles
} from 'lucide-react';

export default function PaywallPage() {
    const router = useRouter();
    const [results, setResults] = useState<TestResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedResults = sessionStorage.getItem('iq_spark_results');
        if (!storedResults) {
            router.push('/');
            return;
        }
        setResults(JSON.parse(storedResults));
    }, [router]);

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            // In production, this would call the checkout API
            // For now, simulate by redirecting to success page
            const attemptId = sessionStorage.getItem('iq_spark_seed');

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ attemptId }),
            });

            if (response.ok) {
                const { url } = await response.json();
                if (url) {
                    window.location.href = url;
                }
            } else {
                // If API not available, use demo mode
                sessionStorage.setItem('iq_spark_paid', 'demo');
                router.push('/payment/success?demo=true');
            }
        } catch {
            // Demo mode fallback
            sessionStorage.setItem('iq_spark_paid', 'demo');
            router.push('/payment/success?demo=true');
        }

        setIsLoading(false);
    };

    if (!results) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    const scorePercentage = (results.rawScore / results.maxScore) * 100;

    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Completion message */}
                    <div className="text-center mb-8">
                        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
                        <p className="text-muted-foreground">
                            Your responses have been analyzed and your report is ready.
                        </p>
                    </div>

                    {/* Teaser card - blurred preview */}
                    <Card className="glass border-border/40 mb-8 overflow-hidden">
                        <CardHeader className="text-center border-b border-border/40">
                            <CardTitle className="text-xl">Your Results Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="relative">
                                {/* Blurred content */}
                                <div className="filter blur-sm pointer-events-none select-none">
                                    <div className="text-center mb-6">
                                        <div className="text-4xl font-bold text-primary mb-2">
                                            {results.scoreBand}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Estimated IQ Range
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Score Progress</span>
                                            <span>{Math.round(scorePercentage)}%</span>
                                        </div>
                                        <Progress value={scorePercentage} max={100} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {results.categoryScores.slice(0, 2).map((cat, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-card/50 border border-border/40">
                                                <div className="text-sm text-muted-foreground mb-1">{cat.category}</div>
                                                <div className="font-semibold">{cat.score}/{cat.maxScore}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Lock overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
                                    <div className="text-center">
                                        <Lock className="h-12 w-12 text-primary mx-auto mb-3" />
                                        <p className="font-semibold">Unlock Your Full Report</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* What's included */}
                    <Card className="glass border-border/40 mb-8">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Your Full Report Includes:</h3>
                            <ul className="space-y-3">
                                {[
                                    { icon: Brain, text: 'Detailed IQ Range Estimation' },
                                    { icon: BarChart3, text: 'Percentile Ranking Comparison' },
                                    { icon: Sparkles, text: 'Cognitive Strengths Breakdown' },
                                    { icon: FileText, text: 'Downloadable PDF Report' },
                                ].map(({ icon: Icon, text }, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                            <Icon className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Pricing and CTA */}
                    <Card className="gradient-primary border-0 mb-8">
                        <CardContent className="p-8 text-center">
                            <div className="mb-6">
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <span className="text-5xl font-bold text-white">$14.99</span>
                                </div>
                                <Badge className="bg-white/20 text-white border-white/30">
                                    One-Time Payment
                                </Badge>
                            </div>

                            <ul className="flex flex-wrap justify-center gap-4 mb-6 text-white/90 text-sm">
                                <li className="flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    No subscription
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    No recurring charges
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    Instant access
                                </li>
                            </ul>

                            <Button
                                size="xl"
                                className="w-full bg-white text-primary hover:bg-white/90 group"
                                onClick={handleCheckout}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    'Processing...'
                                ) : (
                                    <>
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Unlock My Report
                                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CreditCard className="h-4 w-4 text-primary" />
                            <span>Secure Stripe Checkout</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>No Card Data Stored</span>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-center text-muted-foreground">
                        This test provides an estimate for entertainment/educational purposes only.
                        It is not a clinical diagnosis. By purchasing, you agree to our{' '}
                        <Link href="/legal/terms" className="text-primary hover:underline">Terms</Link>
                        {' '}and{' '}
                        <Link href="/legal/refund-policy" className="text-primary hover:underline">Refund Policy</Link>.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
