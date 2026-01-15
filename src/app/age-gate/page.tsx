'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertCircle, ArrowRight, Clock, Brain } from 'lucide-react';

export default function AgeGatePage() {
    const router = useRouter();
    const [isAdult, setIsAdult] = useState(false);
    const [hasGuardianConsent, setHasGuardianConsent] = useState(false);
    const [acceptsTerms, setAcceptsTerms] = useState(false);
    const [understandsDisclaimer, setUnderstandsDisclaimer] = useState(false);

    const canProceed = (isAdult || hasGuardianConsent) && acceptsTerms && understandsDisclaimer;

    const handleStart = () => {
        if (canProceed) {
            // 1. 포트원 라이브러리 초기화 (IMP는 window 객체에 있음)
            const { IMP } = window as any;
            IMP.init('imp48642047') 관리자 콘솔에서 확인한 코드를 입력하세요.

                // 2. 결제창 띄우기ㄴ
                IMP.request_pay({
                    pg: 'stripe', // 이미지 2번에서 설정할 PG사
                    pay_method: 'card',
                    merchant_uid: `mid_${new Date().getTime()}`,
                    name: 'IQ 테스트 결과 리포트',
                    amount: 14.99, // 이미지 4번 계획안의 가격
                    currency: 'USD'
                }, (rsp: any) => {
                    if (rsp.success) {
                        // 결제 성공 시에만 기존 로직 실행 (테스트 시작)
                        const seed = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
                        sessionStorage.setItem('iq_spark_seed', seed);
                        sessionStorage.setItem('iq_spark_started', new Date().toISOString());
                        router.push('/test');
                    } else {
                        alert(`결제 실패: ${rsp.error_msg}`);
                    }
                });
        }
    };

    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <Card className="max-w-xl w-full glass border-border/40">
                    <CardHeader className="text-center">
                        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl">Before You Begin</CardTitle>
                        <CardDescription className="text-base">
                            Please confirm the following before starting the test
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Test info */}
                        <div className="flex justify-center gap-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Brain className="h-4 w-4 text-primary" />
                                <span>24 Questions</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>18 Minutes</span>
                            </div>
                        </div>

                        {/* Pricing reminder */}
                        <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
                            <p className="text-sm text-muted-foreground mb-2">Full Report Unlock Price</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl font-bold text-primary">$14.99</span>
                                <Badge variant="success">One-time only</Badge>
                            </div>
                            <p className="text-xs text-green-400 mt-2">
                                No subscription • No recurring charges
                            </p>
                        </div>

                        {/* Age verification */}
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <Checkbox
                                    id="isAdult"
                                    checked={isAdult}
                                    onChange={(e) => setIsAdult(e.target.checked)}
                                    label="I am 18 years of age or older"
                                />

                                {!isAdult && (
                                    <div className="ml-8">
                                        <Checkbox
                                            id="guardianConsent"
                                            checked={hasGuardianConsent}
                                            onChange={(e) => setHasGuardianConsent(e.target.checked)}
                                            label="I am under 18 and have my parent/guardian's consent to take this test"
                                        />
                                    </div>
                                )}
                            </div>

                            <Checkbox
                                id="acceptTerms"
                                checked={acceptsTerms}
                                onChange={(e) => setAcceptsTerms(e.target.checked)}
                                label={
                                    <>
                                        I agree to the{' '}
                                        <a href="/legal/terms" className="text-primary hover:underline" target="_blank">
                                            Terms of Service
                                        </a>
                                        {' '}and{' '}
                                        <a href="/legal/privacy" className="text-primary hover:underline" target="_blank">
                                            Privacy Policy
                                        </a>
                                    </>
                                }
                            />

                            <Checkbox
                                id="disclaimer"
                                checked={understandsDisclaimer}
                                onChange={(e) => setUnderstandsDisclaimer(e.target.checked)}
                                label="I understand this test is for entertainment/educational purposes only and is not a clinical diagnosis"
                            />
                        </div>

                        {/* Disclaimer */}
                        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-muted-foreground">
                                    Do not use results for employment, academic placement, immigration,
                                    legal, medical, or other high-stakes decisions. Results may vary
                                    based on conditions such as fatigue or distraction.
                                </p>
                            </div>
                        </div>

                        {/* Start button */}
                        <Button
                            variant="gradient"
                            size="xl"
                            className="w-full group"
                            disabled={!canProceed}
                            onClick={handleStart}
                        >
                            Start the Test
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            By starting, you confirm you&apos;ve read and agree to our terms.
                            You can take the test for free and only pay if you want your full report.
                        </p>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
