import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

export default function PaymentCancelledPage() {
    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-lg mx-auto">
                    <Card className="glass border-border/40">
                        <CardContent className="p-8 text-center">
                            <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                                <XCircle className="h-8 w-8 text-yellow-500" />
                            </div>

                            <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
                            <p className="text-muted-foreground mb-6">
                                Your payment was not completed. Don't worry — you can try again
                                whenever you're ready.
                            </p>

                            <div className="space-y-3">
                                <Link href="/paywall">
                                    <Button variant="gradient" size="lg" className="w-full">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Return to Checkout
                                    </Button>
                                </Link>

                                <Link href="/support">
                                    <Button variant="outline" size="lg" className="w-full">
                                        <HelpCircle className="h-4 w-4 mr-2" />
                                        Need Help?
                                    </Button>
                                </Link>
                            </div>

                            <p className="text-xs text-muted-foreground mt-6">
                                Your test results are still saved. You can unlock your report
                                at any time with a one-time payment of $14.99.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
