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
    Brain,
    Trophy,
    TrendingUp,
    Target,
    Download,
    Share2,
    CheckCircle,
    AlertTriangle,
    BarChart3,
    Sparkles,
    FileText
} from 'lucide-react';

export default function ResultsPage() {
    const router = useRouter();
    const [results, setResults] = useState<TestResult | null>(null);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        const storedResults = sessionStorage.getItem('iq_spark_results');
        const paid = sessionStorage.getItem('iq_spark_paid');

        if (!storedResults) {
            router.push('/');
            return;
        }

        if (!paid) {
            router.push('/paywall');
            return;
        }

        setResults(JSON.parse(storedResults));
        setIsPaid(true);
    }, [router]);

    const handleDownloadPDF = () => {
        // In production, this would generate and download a PDF
        alert('PDF download would be triggered here. This feature requires server-side PDF generation.');
    };

    const handleShare = () => {
        // Share functionality
        if (navigator.share) {
            navigator.share({
                title: 'IQ Spark Results',
                text: `I scored in the ${results?.scoreBand} range on IQ Spark!`,
                url: window.location.origin,
            });
        } else {
            // Copy to clipboard fallback
            navigator.clipboard.writeText(`I scored in the ${results?.scoreBand} range on IQ Spark! Try it at ${window.location.origin}`);
            alert('Results copied to clipboard!');
        }
    };

    if (!results || !isPaid) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <p className="text-muted-foreground">Loading results...</p>
            </div>
        );
    }

    const scorePercentage = (results.rawScore / results.maxScore) * 100;

    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Badge variant="success" className="mb-4">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Report Unlocked
                        </Badge>
                        <h1 className="text-3xl font-bold mb-2">Your IQ Spark Report</h1>
                        <p className="text-muted-foreground">
                            Based on your performance on 24 nonverbal reasoning questions
                        </p>
                    </div>

                    {/* Main score card */}
                    <Card className="glass border-border/40 mb-8 overflow-hidden">
                        <div className="gradient-primary p-8 text-center text-white">
                            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <Brain className="h-10 w-10" />
                            </div>
                            <div className="text-5xl font-bold mb-2">{results.scoreBand}</div>
                            <div className="text-white/80">Estimated IQ Range</div>
                        </div>

                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="text-center p-4 rounded-lg bg-card/50 border border-border/40">
                                    <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{results.percentileBand}</div>
                                    <div className="text-sm text-muted-foreground">Percentile</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-card/50 border border-border/40">
                                    <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{results.rawScore}/{results.maxScore}</div>
                                    <div className="text-sm text-muted-foreground">Total Score</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category scores */}
                    <Card className="glass border-border/40 mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Performance by Category
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {results.categoryScores.map((category, i) => (
                                <div key={i}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">{category.category}</span>
                                        <span className="text-muted-foreground">
                                            {category.score}/{category.maxScore}
                                        </span>
                                    </div>
                                    <Progress
                                        value={category.score}
                                        max={category.maxScore}
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {category.description}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Strengths */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Card className="glass border-border/40">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-400">
                                    <Sparkles className="h-5 w-5" />
                                    Your Strengths
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {results.strengths.map((strength, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {results.areasForGrowth.length > 0 && (
                            <Card className="glass border-border/40">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-yellow-400">
                                        <TrendingUp className="h-5 w-5" />
                                        Areas for Growth
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {results.areasForGrowth.map((area, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <Target className="h-4 w-4 text-yellow-500" />
                                                <span>{area}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Button
                            variant="gradient"
                            size="lg"
                            className="flex-1"
                            onClick={handleDownloadPDF}
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF Report
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex-1"
                            onClick={handleShare}
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Results
                        </Button>
                    </div>

                    {/* Disclaimer */}
                    <Card className="border-yellow-500/30 bg-yellow-500/10 mb-8">
                        <CardContent className="p-4">
                            <div className="flex gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-medium mb-1">Important Disclaimer</p>
                                    <p className="text-muted-foreground">
                                        This test provides an estimate for entertainment and educational purposes only.
                                        It is not a medical, psychological, or clinical diagnosis. Do not use results
                                        for employment, academic placement, immigration, legal, medical, or other
                                        high-stakes decisions. Results may vary based on conditions such as fatigue,
                                        distraction, or device.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support link */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Questions about your results? Need help?
                        </p>
                        <Link href="/support">
                            <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
