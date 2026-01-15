import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Zap,
    Brain,
    Clock,
    CreditCard,
    ShieldCheck,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Target,
    BarChart3
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Badge */}
                            <Badge variant="success" className="mb-6 text-sm py-1.5 px-4">
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                One-Time Payment • No Subscription
                            </Badge>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                                Discover Your{' '}
                                <span className="text-transparent bg-clip-text gradient-primary">
                                    Cognitive Potential
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Take our fast, modern nonverbal reasoning test. Get a detailed report
                                with your estimated IQ range, percentile, and cognitive strengths.
                            </p>

                            {/* Pricing highlight */}
                            <div className="inline-flex flex-col items-center mb-8 p-6 rounded-2xl glass">
                                <span className="text-muted-foreground text-sm mb-2">Unlock Your Full Report</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-primary">$14.99</span>
                                    <span className="text-muted-foreground">one-time</span>
                                </div>
                                <span className="text-sm text-green-400 mt-2 flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    No subscription. No recurring charges.
                                </span>
                            </div>

                            {/* CTA */}
                            <Link href="/age-gate">
                                <Button variant="gradient" size="xl" className="group">
                                    Start Free Test
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <p className="text-sm text-muted-foreground mt-4">
                                24 questions • 18 minutes • Pay only if you want the full report
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 border-t border-border/40">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Why Choose IQ Spark?
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <Card className="glass border-border/40">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                                        <Brain className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Original Questions</h3>
                                    <p className="text-muted-foreground">
                                        All questions are original, nonverbal reasoning tasks designed
                                        to measure pattern recognition and logical thinking.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="glass border-border/40">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Quick & Modern</h3>
                                    <p className="text-muted-foreground">
                                        Complete the test in just 18 minutes with a clean,
                                        mobile-friendly interface that works on any device.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="glass border-border/40">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                                        <CreditCard className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                                    <p className="text-muted-foreground">
                                        One payment of $14.99 to unlock your report.
                                        No hidden fees, no subscriptions, no surprises.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 border-t border-border/40">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            How It Works
                        </h2>

                        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {[
                                { icon: Zap, title: 'Start', desc: 'Begin the free test' },
                                { icon: Target, title: 'Solve', desc: 'Answer 24 questions' },
                                { icon: CreditCard, title: 'Unlock', desc: 'Pay $14.99 once' },
                                { icon: BarChart3, title: 'Review', desc: 'Get your full report' },
                            ].map((step, i) => (
                                <div key={i} className="text-center">
                                    <div className="relative mx-auto mb-4">
                                        <div className="h-16 w-16 rounded-2xl glass flex items-center justify-center mx-auto">
                                            <step.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                                            {i + 1}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold mb-1">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Report Preview Section */}
                <section className="py-20 border-t border-border/40">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-4">
                                What's in Your Report?
                            </h2>
                            <p className="text-center text-muted-foreground mb-12">
                                Your personalized report includes detailed insights into your cognitive abilities.
                            </p>

                            <Card className="glass border-border/40 overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                                    <Sparkles className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Estimated IQ Range</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Your score band based on nonverbal reasoning performance
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                                    <BarChart3 className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Percentile Ranking</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        How you compare to others who took the test
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                                    <Target className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Cognitive Strengths</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Breakdown by category: patterns, sequences, analogies
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                                    <CheckCircle className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">PDF Download</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Keep your results with a downloadable report
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 flex flex-col items-center justify-center">
                                                <Brain className="h-16 w-16 text-primary/50 mb-4" />
                                                <div className="text-4xl font-bold text-primary mb-2">115-119</div>
                                                <div className="text-sm text-muted-foreground mb-4">Estimated IQ Range</div>
                                                <Badge variant="success">84th-90th Percentile</Badge>
                                                <p className="text-xs text-muted-foreground mt-4 text-center">
                                                    Sample report preview
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-20 border-t border-border/40">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                Ready to Discover Your Potential?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Take the test for free. Pay only if you want your full personalized report.
                            </p>

                            <div className="inline-flex flex-col items-center mb-8 p-6 rounded-2xl glass">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl font-bold text-primary">$14.99</span>
                                    <span className="text-muted-foreground">one-time payment</span>
                                </div>
                                <span className="text-sm text-green-400 flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    No subscription. No recurring charges. Ever.
                                </span>
                            </div>

                            <Link href="/age-gate">
                                <Button variant="gradient" size="xl" className="group">
                                    Start Your Test Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
