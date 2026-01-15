import Link from 'next/link';
import { Zap, Shield, Lock } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-background/95">
            <div className="container mx-auto px-4 py-12">
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Payment secured by Stripe</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4 text-green-500" />
                        <span>One-time payment only</span>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Take the Test
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Refund Request
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">About</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold">IQ Spark</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Modern nonverbal reasoning assessment for entertainment and educational purposes.
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="border-t border-border/40 pt-8 mb-8">
                    <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
                        <strong>Disclaimer:</strong> This test provides an estimate for entertainment and educational purposes only.
                        It is not a medical, psychological, or clinical diagnosis. Do not use results for employment, academic placement,
                        immigration, legal, medical, or other high-stakes decisions. Results may vary based on conditions such as fatigue,
                        distraction, or device.
                    </p>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {currentYear} IQ Spark. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                        One-time payment of $14.99. NO subscription. NO recurring billing.
                    </p>
                </div>
            </div>
        </footer>
    );
}
