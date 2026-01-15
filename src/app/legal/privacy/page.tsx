import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const metadata = {
    title: 'Privacy Policy - IQ Spark',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
                        <p className="text-muted-foreground">Last updated: January 2025</p>
                    </div>

                    <Card className="glass border-border/40">
                        <CardContent className="p-8 prose prose-invert prose-sm max-w-none">
                            <h2 className="text-xl font-semibold mt-0">1. Introduction</h2>
                            <p className="text-muted-foreground">
                                IQ Spark ("we", "our", "us") respects your privacy. This Privacy Policy explains how
                                we collect, use, and protect your personal information when you use our Service.
                            </p>

                            <h2 className="text-xl font-semibold">2. Data Minimization</h2>
                            <p className="text-muted-foreground">
                                We follow a data minimization approach and only collect information necessary to
                                provide the Service:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li><strong>Test attempt data:</strong> Unique attempt ID, seed, timestamp, answers, score</li>
                                <li><strong>Payment data:</strong> Handled entirely by Stripe (we do not store card numbers)</li>
                                <li><strong>Email:</strong> Only if you provide it during checkout for receipt delivery</li>
                                <li><strong>Device information:</strong> Basic browser/device info for compatibility</li>
                            </ul>

                            <h2 className="text-xl font-semibold">3. How We Use Your Data</h2>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>To deliver your test results and report</li>
                                <li>To process payments through Stripe</li>
                                <li>To send purchase receipts (if email provided)</li>
                                <li>To respond to support requests</li>
                                <li>To improve our Service</li>
                            </ul>

                            <h2 className="text-xl font-semibold">4. Payment Information</h2>
                            <p className="text-muted-foreground">
                                All payment processing is handled by Stripe, a PCI-DSS compliant payment processor.
                                We never see, store, or have access to your full credit card number. Stripe's privacy
                                policy applies to payment data.
                            </p>

                            <h2 className="text-xl font-semibold">5. Cookies and Analytics</h2>
                            <p className="text-muted-foreground">
                                We may use privacy-friendly analytics to understand how users interact with our Service.
                                We use:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>Session storage for test progress (cleared when you close the browser)</li>
                                <li>Essential cookies for site functionality</li>
                                <li>Optional analytics cookies (with your consent where required)</li>
                            </ul>

                            <h2 className="text-xl font-semibold">6. Your Rights</h2>
                            <p className="text-muted-foreground">
                                Depending on your location, you may have rights under GDPR (EU), CCPA (California),
                                PIPA (Korea), or other privacy laws, including:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                                <li><strong>Opt-out:</strong> Opt-out of analytics and marketing communications</li>
                            </ul>
                            <p className="text-muted-foreground">
                                To exercise these rights, contact us at{' '}
                                <a href="/support" className="text-primary hover:underline">support@iqspark.com</a>.
                            </p>

                            <h2 className="text-xl font-semibold">7. Data Security</h2>
                            <p className="text-muted-foreground">
                                We implement appropriate security measures including:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li>Encryption in transit (HTTPS/TLS)</li>
                                <li>Encryption at rest for stored data</li>
                                <li>Role-based access controls</li>
                                <li>Regular security reviews</li>
                            </ul>

                            <h2 className="text-xl font-semibold">8. Data Retention</h2>
                            <p className="text-muted-foreground">
                                We retain your data only as long as necessary to provide the Service or comply with
                                legal obligations. Test results are retained for your access; you may request deletion
                                at any time.
                            </p>

                            <h2 className="text-xl font-semibold">9. Third-Party Services</h2>
                            <p className="text-muted-foreground">We use the following third-party services:</p>
                            <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                                <li><strong>Stripe:</strong> Payment processing</li>
                                <li><strong>Vercel/Hosting:</strong> Website hosting</li>
                                <li><strong>Supabase:</strong> Database services</li>
                            </ul>

                            <h2 className="text-xl font-semibold">10. Children's Privacy</h2>
                            <p className="text-muted-foreground">
                                Our Service is intended for users 18 and older or minors with parental/guardian consent.
                                We do not knowingly collect data from children under 13 without parental consent.
                            </p>

                            <h2 className="text-xl font-semibold">11. Changes to This Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this Privacy Policy periodically. We will notify you of material changes
                                by posting the new policy on this page with an updated date.
                            </p>

                            <h2 className="text-xl font-semibold">12. Contact Us</h2>
                            <p className="text-muted-foreground">
                                For privacy-related questions or to exercise your rights, contact us at{' '}
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
