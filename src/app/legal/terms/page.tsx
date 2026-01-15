import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const metadata = {
    title: 'Terms of Service - IQ Spark',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
                        <p className="text-muted-foreground">Last updated: January 2025</p>
                    </div>

                    <Card className="glass border-border/40">
                        <CardContent className="p-8 prose prose-invert prose-sm max-w-none">
                            <h2 className="text-xl font-semibold mt-0">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground">
                                By accessing or using IQ Spark ("Service"), you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use the Service.
                            </p>

                            <h2 className="text-xl font-semibold">2. Description of Service</h2>
                            <p className="text-muted-foreground">
                                IQ Spark provides a nonverbal reasoning assessment tool for entertainment and educational
                                purposes. The Service includes a free test and an optional paid results report.
                            </p>

                            <h2 className="text-xl font-semibold">3. Not a Clinical Assessment</h2>
                            <p className="text-muted-foreground">
                                <strong>IMPORTANT:</strong> IQ Spark is NOT a medical, psychological, or clinical diagnostic
                                tool. Results are provided for entertainment and educational purposes only. Do NOT use
                                results from this Service for:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>Employment or hiring decisions</li>
                                <li>Academic placement or admissions</li>
                                <li>Immigration or legal proceedings</li>
                                <li>Medical or psychological diagnosis</li>
                                <li>Any other high-stakes decisions</li>
                            </ul>

                            <h2 className="text-xl font-semibold">4. Payment Terms</h2>
                            <p className="text-muted-foreground">
                                The results report is available for a one-time payment of US$14.99. By making a payment:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>You authorize a single charge to your payment method</li>
                                <li>No subscription or recurring billing will be created</li>
                                <li>Payment is processed securely through Stripe</li>
                                <li>Applicable taxes may apply based on your location</li>
                            </ul>

                            <h2 className="text-xl font-semibold">5. Digital Content License</h2>
                            <p className="text-muted-foreground">
                                Upon payment, you receive a personal, non-transferable license to access and download
                                your results report. You may not:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>Redistribute or sell access to the Service</li>
                                <li>Reverse engineer the scoring algorithm</li>
                                <li>Use automated tools to scrape questions or content</li>
                                <li>Share questions or answers with third parties</li>
                            </ul>

                            <h2 className="text-xl font-semibold">6. Refund Policy</h2>
                            <p className="text-muted-foreground">
                                Because the product is digital content delivered immediately upon payment, refunds are
                                generally not available once access is provided. Exceptions apply for:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>Technical failures preventing access (contact support within 7 days)</li>
                                <li>Duplicate or unauthorized charges</li>
                                <li>Where required by applicable consumer protection laws</li>
                            </ul>
                            <p className="text-muted-foreground">
                                For full details, see our <a href="/legal/refund-policy" className="text-primary hover:underline">Refund Policy</a>.
                            </p>

                            <h2 className="text-xl font-semibold">7. Accuracy Disclaimer</h2>
                            <p className="text-muted-foreground">
                                We make no guarantees about the accuracy of results. Scores may vary based on:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>Test-taking conditions (fatigue, distraction, time of day)</li>
                                <li>Device or browser compatibility</li>
                                <li>Individual factors</li>
                            </ul>

                            <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
                            <p className="text-muted-foreground">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IQ SPARK AND ITS OPERATORS SHALL NOT BE LIABLE
                                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM
                                YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR
                                THE SERVICE.
                            </p>

                            <h2 className="text-xl font-semibold">9. Warranty Disclaimer</h2>
                            <p className="text-muted-foreground">
                                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                            </p>

                            <h2 className="text-xl font-semibold">10. Indemnification</h2>
                            <p className="text-muted-foreground">
                                You agree to indemnify and hold harmless IQ Spark and its operators from any claims,
                                damages, or expenses arising from your misuse of the Service or violation of these terms.
                            </p>

                            <h2 className="text-xl font-semibold">11. Governing Law</h2>
                            <p className="text-muted-foreground">
                                These Terms shall be governed by the laws of the Republic of Korea. Any disputes shall
                                be resolved in the courts of Seoul, Korea. Nothing in these terms affects any mandatory
                                consumer protection rights you may have under your local laws.
                            </p>

                            <h2 className="text-xl font-semibold">12. Contact</h2>
                            <p className="text-muted-foreground">
                                For questions about these Terms, contact us at{' '}
                                <a href="/support" className="text-primary hover:underline">support@iqspark.com</a>.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
