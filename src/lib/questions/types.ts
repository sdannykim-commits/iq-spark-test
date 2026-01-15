// Question Types for IQ Spark
export type QuestionType = 'matrix' | 'sequence' | 'analogy' | 'odd_one_out';
export type Difficulty = 1 | 2 | 3; // easy, medium, hard

export interface Question {
    id: string;
    type: QuestionType;
    prompt: SVGInstruction;
    options: SVGInstruction[];
    correctIndex: number;
    difficulty: Difficulty;
    ruleTags: string[];
    points: number;
}

export interface SVGInstruction {
    width: number;
    height: number;
    shapes: Shape[];
}

export type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'star' | 'cross' | 'arrow';

export interface Shape {
    type: ShapeType;
    x: number;
    y: number;
    size: number;
    rotation: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
}

export interface TestAttempt {
    id: string;
    seed: string;
    questions: Question[];
    answers: (number | null)[];
    startedAt: Date | null;
    completedAt: Date | null;
    rawScore: number | null;
    scoreBand: string | null;
    percentileBand: string | null;
    reportUnlocked: boolean;
}

export interface TestResult {
    rawScore: number;
    maxScore: number;
    scoreBand: string;
    percentileBand: string;
    categoryScores: CategoryScore[];
    strengths: string[];
    areasForGrowth: string[];
}

export interface CategoryScore {
    category: string;
    score: number;
    maxScore: number;
    description: string;
}

// Color palette for SVG shapes (colorblind-friendly)
export const SHAPE_COLORS = {
    primary: '#8B5CF6',    // Purple
    secondary: '#3B82F6',  // Blue  
    accent: '#10B981',     // Green
    warm: '#F59E0B',       // Amber
    neutral: '#6B7280',    // Gray
    dark: '#1F2937',       // Dark gray
    light: '#F3F4F6',      // Light gray
} as const;

// Shape patterns for different question types
export const SHAPE_TYPES: ShapeType[] = [
    'circle', 'square', 'triangle', 'diamond', 'hexagon', 'star', 'cross', 'arrow'
];
