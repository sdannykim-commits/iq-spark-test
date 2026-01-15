'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { QuestionDisplay, Timer } from '@/components/question';
import { generateTest, getTimeLimit, getQuestionsCount, calculateResults } from '@/lib/questions';
import { Question } from '@/lib/questions/types';
import { ArrowLeft, ArrowRight, CheckCircle, Zap, X } from 'lucide-react';

export default function TestPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [isRunning, setIsRunning] = useState(true);
    const [showExitDialog, setShowExitDialog] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize test
    useEffect(() => {
        const seed = sessionStorage.getItem('iq_spark_seed');
        if (!seed) {
            router.push('/');
            return;
        }

        const generatedQuestions = generateTest(seed);
        setQuestions(generatedQuestions);
        setAnswers(new Array(generatedQuestions.length).fill(null));
        setIsLoaded(true);
    }, [router]);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const answeredCount = answers.filter(a => a !== null).length;

    const handleSelectOption = useCallback((optionIndex: number) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentIndex] = optionIndex;
            return newAnswers;
        });
    }, [currentIndex]);

    const handleNext = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, questions.length]);

    const handlePrevious = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const handleFinish = useCallback(() => {
        setIsRunning(false);

        // Calculate results
        const results = calculateResults(questions, answers);

        // Store results in session storage
        sessionStorage.setItem('iq_spark_results', JSON.stringify(results));
        sessionStorage.setItem('iq_spark_answers', JSON.stringify(answers));
        sessionStorage.setItem('iq_spark_completed', new Date().toISOString());

        // Navigate to paywall
        router.push('/paywall');
    }, [questions, answers, router]);

    const handleTimeUp = useCallback(() => {
        handleFinish();
    }, [handleFinish]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Zap className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-muted-foreground">Loading test...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={() => setShowExitDialog(true)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="flex-1 max-w-xs">
                            <Progress value={currentIndex + 1} max={questions.length} />
                        </div>

                        <Timer
                            initialSeconds={getTimeLimit()}
                            onTimeUp={handleTimeUp}
                            isRunning={isRunning}
                        />
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {currentQuestion && (
                    <QuestionDisplay
                        prompt={currentQuestion.prompt}
                        options={currentQuestion.options}
                        selectedOption={answers[currentIndex]}
                        onSelectOption={handleSelectOption}
                        questionNumber={currentIndex + 1}
                        totalQuestions={questions.length}
                    />
                )}
            </main>

            {/* Navigation footer */}
            <footer className="sticky bottom-0 border-t border-border/40 bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                {answeredCount}/{questions.length} answered
                            </Badge>
                        </div>

                        {currentIndex === questions.length - 1 ? (
                            <Button
                                variant="gradient"
                                onClick={handleFinish}
                                disabled={answeredCount === 0}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Finish Test
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                onClick={handleNext}
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </footer>

            {/* Exit confirmation dialog */}
            {showExitDialog && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-xl p-6 max-w-sm w-full shadow-2xl border border-border/40">
                        <h3 className="text-lg font-semibold mb-2">Exit Test?</h3>
                        <p className="text-muted-foreground mb-6">
                            Your progress will be lost if you exit now. Are you sure?
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowExitDialog(false)}
                            >
                                Continue Test
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() => router.push('/')}
                            >
                                Exit
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
