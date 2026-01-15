'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Mail,
    MessageSquare,
    Send,
    CheckCircle,
    Clock,
    FileText,
    AlertCircle
} from 'lucide-react';

export default function SupportPage() {
    const [formData, setFormData] = useState({
        email: '',
        orderId: '',
        subject: 'general',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send to an API
        console.log('Support request:', formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen gradient-bg flex flex-col">
                <Header />

                <main className="flex-1 container mx-auto px-4 py-12">
                    <div className="max-w-lg mx-auto">
                        <Card className="glass border-border/40">
                            <CardContent className="p-8 text-center">
                                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                                <p className="text-muted-foreground mb-4">
                                    We've received your message and will respond within 24-48 hours.
                                </p>
                                <Badge variant="secondary" className="mb-6">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Response time: 24-48 hours
                                </Badge>
                                <a href="/" className="text-primary hover:underline">
                                    ← Return to Home
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Support & Help</h1>
                        <p className="text-muted-foreground">
                            We're here to help. Fill out the form below and we'll get back to you.
                        </p>
                    </div>

                    {/* Info cards */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        <Card className="glass border-border/40">
                            <CardContent className="p-4 flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold">Email Support</div>
                                    <div className="text-sm text-muted-foreground">
                                        support@iqspark.com
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="glass border-border/40">
                            <CardContent className="p-4 flex items-start gap-3">
                                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold">Response Time</div>
                                    <div className="text-sm text-muted-foreground">
                                        24-48 business hours
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Support form */}
                    <Card className="glass border-border/40">
                        <CardHeader>
                            <CardTitle>Contact Form</CardTitle>
                            <CardDescription>
                                Please provide as much detail as possible so we can help you quickly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="orderId" className="block text-sm font-medium mb-2">
                                        Order ID (if applicable)
                                    </label>
                                    <Input
                                        id="orderId"
                                        type="text"
                                        value={formData.orderId}
                                        onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                                        placeholder="e.g., DEMO-1234567890"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="payment">Payment Issue</option>
                                        <option value="refund">Refund Request</option>
                                        <option value="technical">Technical Problem</option>
                                        <option value="results">Question About Results</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Please describe your issue or question in detail..."
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none"
                                    />
                                </div>

                                {/* Refund notice */}
                                {formData.subject === 'refund' && (
                                    <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
                                        <div className="flex gap-3">
                                            <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                            <div className="text-sm">
                                                <p className="font-medium mb-1">Refund Policy Notice</p>
                                                <p className="text-muted-foreground">
                                                    Because our product is digital content delivered immediately,
                                                    refunds are generally not available. However, if you experienced
                                                    a technical issue that prevented you from accessing your report,
                                                    please describe the problem and include your order ID.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Button type="submit" variant="gradient" size="lg" className="w-full">
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Quick links */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Looking for something specific?
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/faq" className="text-sm text-primary hover:underline flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                FAQ
                            </a>
                            <a href="/legal/refund-policy" className="text-sm text-primary hover:underline flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                Refund Policy
                            </a>
                            <a href="/legal/terms" className="text-sm text-primary hover:underline flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
