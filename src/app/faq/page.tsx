import { Header, Footer } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    HelpCircle,
    CreditCard,
    Clock,
    Shield,
    Brain,
    FileText,
    ChevronDown
} from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What is IQ Spark?",
        answer: "IQ Spark is a modern, nonverbal reasoning test designed to provide an estimate of your cognitive abilities. It uses original, pattern-based questions that don't rely on language or cultural knowledge, making it fair for everyone."
    },
    {
        question: "Is this a real IQ test?",
        answer: "IQ Spark is designed for entertainment and educational purposes only. It is NOT a clinical, medical, or psychological assessment. For official IQ testing, please consult a licensed psychologist or educational institution."
    },
    {
        question: "How much does it cost?",
        answer: "Taking the test is free. If you want to unlock your full results report, it's a one-time payment of $14.99. There are NO subscriptions, NO recurring charges, and NO hidden fees. Ever."
    },
    {
        question: "Will I be charged again after purchasing?",
        answer: "Absolutely not. IQ Spark uses a one-time payment model. Once you pay $14.99, you get permanent access to your results. We do NOT create subscriptions or store payment methods for recurring billing."
    },
    {
        question: "How long does the test take?",
        answer: "The test consists of 24 questions with an 18-minute time limit. Most people complete it in 12-15 minutes."
    },
    {
        question: "What types of questions are on the test?",
        answer: "The test includes four types of nonverbal reasoning questions: matrix reasoning (pattern completion), sequence completion, visual analogies, and odd-one-out puzzles. All questions use original SVG graphics."
    },
    {
        question: "Can I retake the test?",
        answer: "Yes, you can retake the test as many times as you like. However, each new attempt would require a new payment to unlock the results."
    },
    {
        question: "Is my data secure?",
        answer: "Yes. We use Stripe for payment processing, which is PCI-DSS compliant. We never store your card information on our servers. For more details, see our Privacy Policy."
    },
    {
        question: "What's included in the results report?",
        answer: "Your report includes: your estimated IQ range, percentile ranking, performance breakdown by category (pattern recognition, sequential reasoning, analogical thinking, visual discrimination), identified strengths, and a downloadable PDF."
    },
    {
        question: "How do I request a refund?",
        answer: "Because the product is digital content delivered immediately, refunds are generally not available. However, if you were charged but didn't receive access due to a technical issue, contact us within 7 days at our support page."
    }
];

export default function FAQPage() {
    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
                        <p className="text-muted-foreground">
                            Everything you need to know about IQ Spark
                        </p>
                    </div>

                    {/* Quick info cards */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-12">
                        <Card className="glass border-border/40 text-center">
                            <CardContent className="p-4">
                                <CreditCard className="h-6 w-6 text-primary mx-auto mb-2" />
                                <div className="font-semibold">$14.99</div>
                                <div className="text-xs text-muted-foreground">One-time payment</div>
                            </CardContent>
                        </Card>
                        <Card className="glass border-border/40 text-center">
                            <CardContent className="p-4">
                                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                                <div className="font-semibold">18 minutes</div>
                                <div className="text-xs text-muted-foreground">Time limit</div>
                            </CardContent>
                        </Card>
                        <Card className="glass border-border/40 text-center">
                            <CardContent className="p-4">
                                <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
                                <div className="font-semibold">24 questions</div>
                                <div className="text-xs text-muted-foreground">Nonverbal reasoning</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FAQ items */}
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <Card key={i} className="glass border-border/40">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <ChevronDown className="h-4 w-4 text-primary" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-muted-foreground pl-6">
                                        {faq.answer}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <Card className="glass border-border/40 mt-12">
                        <CardContent className="p-6 text-center">
                            <FileText className="h-8 w-8 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Still have questions?</h3>
                            <p className="text-muted-foreground mb-4">
                                Can't find what you're looking for? Our support team is here to help.
                            </p>
                            <a
                                href="/support"
                                className="inline-flex items-center text-primary hover:underline"
                            >
                                Contact Support →
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
