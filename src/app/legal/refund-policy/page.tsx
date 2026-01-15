import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const metadata = {
    title: 'Refund Policy - IQ Spark',
};

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <RefreshCcw className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
                        <p className="text-muted-foreground">Last updated: January 2025</p>
                    </div>

                    {/* Summary cards */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        <Card className="border-red-500/30 bg-red-500/10">
                            <CardContent className="p-4 flex items-start gap-3">
                                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-red-400">Generally Not Refundable</div>
                                    <div className="text-sm text-muted-foreground">
                                        Digital content delivered immediately
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-green-500/30 bg-green-500/10">
                            <CardContent className="p-4 flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-green-400">Exceptions Apply</div>
                                    <div className="text-sm text-muted-foreground">
                                        Technical issues, duplicate charges
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="glass border-border/40">
                        <CardContent className="p-8 prose prose-invert prose-sm max-w-none">
                            <h2 className="text-xl font-semibold mt-0">Digital Content Policy</h2>
                            <p className="text-muted-foreground">
                                Because IQ Spark provides <strong>digital content that is delivered immediately</strong> after
                                payment, refunds are generally not available once you have gained access to your results report.
                            </p>
                            <p className="text-muted-foreground">
                                By completing your purchase, you acknowledge that:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>The product is digital content</li>
                                <li>Access is provided immediately upon payment verification</li>
                                <li>You consent to immediate delivery and waive your right of withdrawal for digital content under applicable laws</li>
                            </ul>

                            <h2 className="text-xl font-semibold">When Refunds ARE Available</h2>
                            <p className="text-muted-foreground">
                                We will provide a refund or equivalent remedy in the following situations:
                            </p>

                            <div className="space-y-4 my-4">
                                <div className="flex gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-green-400">Technical Failure</div>
                                        <p className="text-sm text-muted-foreground m-0">
                                            If you were charged but could not access your results due to a technical issue on our end,
                                            contact us within 7 days with your payment receipt. We will either resolve the issue or
                                            provide a full refund.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-green-400">Duplicate Charge</div>
                                        <p className="text-sm text-muted-foreground m-0">
                                            If you were accidentally charged twice for the same attempt, contact us immediately with
                                            both receipts. We will refund the duplicate charge.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-green-400">Unauthorized Charge</div>
                                        <p className="text-sm text-muted-foreground m-0">
                                            If you believe there was an unauthorized charge on your account, contact us and your
                                            bank/card issuer immediately.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-green-400">Legal Requirement</div>
                                        <p className="text-sm text-muted-foreground m-0">
                                            Where required by applicable consumer protection laws in your jurisdiction, refunds will
                                            be provided in accordance with those laws.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold">When Refunds Are NOT Available</h2>
                            <div className="space-y-4 my-4">
                                <div className="flex gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-red-400">Dissatisfaction with Results</div>
                                        <p className="text-sm text-muted-foreground m-0">
                                            We cannot provide refunds because you are unhappy with your IQ score or results.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-red-400">Change of Mind</div>
                                        <p className="text-sm text-muted-foreground m-0">
                                            Once you have accessed the report, we cannot provide a refund for change of mind.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-red-400">Misunderstanding of Product</div>
                                        <p className="text-sm text-muted-foreground m-0">
                                            The test is clearly described as for entertainment/educational purposes. Refunds are not
                                            available for expecting a clinical assessment.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold">How to Request a Refund</h2>
                            <p className="text-muted-foreground">
                                If you believe you qualify for a refund:
                            </p>
                            <ol className="text-muted-foreground list-decimal pl-4 space-y-1">
                                <li>Go to our <a href="/support" className="text-primary hover:underline">Support page</a></li>
                                <li>Select "Refund Request" as the subject</li>
                                <li>Provide your order ID and email used for purchase</li>
                                <li>Describe the issue in detail</li>
                                <li>Submit within 7 days of your purchase</li>
                            </ol>
                            <p className="text-muted-foreground">
                                We aim to respond to all refund requests within 2-3 business days.
                            </p>

                            <h2 className="text-xl font-semibold">Chargeback Notice</h2>
                            <div className="flex gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground m-0">
                                        Before initiating a chargeback with your bank, please contact us first. We can often
                                        resolve issues faster than the chargeback process. Filing a chargeback for a valid
                                        purchase where access was provided may be considered fraud.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold">Contact</h2>
                            <p className="text-muted-foreground">
                                For refund inquiries:{' '}
                                <a href="/support" className="text-primary hover:underline">support@iqspark.com</a>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Pricing reminder */}
                    <div className="mt-8 text-center">
                        <Badge variant="success" className="text-sm py-1.5 px-4">
                            One-time payment: $14.99 • No subscription • No recurring charges
                        </Badge>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
