'use client';

import React from 'react';
import { SVGInstruction } from '@/lib/questions/types';
import { renderSVG } from '@/lib/questions/svg-utils';

interface QuestionDisplayProps {
    prompt: SVGInstruction;
    options: SVGInstruction[];
    selectedOption: number | null;
    onSelectOption: (index: number) => void;
    questionNumber: number;
    totalQuestions: number;
}

export function QuestionDisplay({
    prompt,
    options,
    selectedOption,
    onSelectOption,
    questionNumber,
    totalQuestions,
}: QuestionDisplayProps) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Question number */}
            <div className="text-center mb-6">
                <span className="text-sm text-muted-foreground">
                    Question {questionNumber} of {totalQuestions}
                </span>
            </div>

            {/* Prompt */}
            <div className="bg-card/50 rounded-xl p-6 mb-8 border border-border/40">
                <div
                    className="w-full max-w-sm mx-auto aspect-square"
                    dangerouslySetInnerHTML={{ __html: renderSVG(prompt) }}
                />
            </div>

            {/* Instructions */}
            <p className="text-center text-sm text-muted-foreground mb-6">
                Select the option that best completes the pattern:
            </p>

            {/* Options grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectOption(index)}
                        className={`
              aspect-square p-4 rounded-xl border-2 transition-all duration-200
              ${selectedOption === index
                                ? 'border-primary bg-primary/10 ring-2 ring-primary/50'
                                : 'border-border/40 hover:border-primary/50 hover:bg-card/50'
                            }
            `}
                        aria-label={`Option ${index + 1}`}
                        aria-pressed={selectedOption === index}
                    >
                        <div
                            className="w-full h-full"
                            dangerouslySetInnerHTML={{ __html: renderSVG(option) }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
