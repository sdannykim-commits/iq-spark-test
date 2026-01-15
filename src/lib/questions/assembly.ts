import { Question, Difficulty, TestResult, CategoryScore } from './types';
import { generateMatrixQuestion, generateSequenceQuestion, generateAnalogyQuestion, generateOddOneOutQuestion } from './generators';
import { seededRandom } from '../utils';

const QUESTIONS_COUNT = 24;
const TIME_LIMIT_SECONDS = 18 * 60; // 18 minutes

// Generate a full test with 24 questions
export function generateTest(seed: string): Question[] {
    const random = seededRandom(seed);
    const questions: Question[] = [];

    // Difficulty distribution: 8 easy, 10 medium, 6 hard
    const difficulties: Difficulty[] = [
        ...Array(8).fill(1),
        ...Array(10).fill(2),
        ...Array(6).fill(3),
    ];

    // Question type distribution: roughly equal mix
    const types = ['matrix', 'sequence', 'analogy', 'odd_one_out'] as const;

    for (let i = 0; i < QUESTIONS_COUNT; i++) {
        const questionSeed = `${seed}-q${i}-${random().toString(36).slice(2)}`;
        const difficulty = difficulties[i];
        const type = types[i % types.length];

        let question: Question;

        switch (type) {
            case 'matrix':
                question = generateMatrixQuestion(questionSeed, difficulty);
                break;
            case 'sequence':
                question = generateSequenceQuestion(questionSeed, difficulty);
                break;
            case 'analogy':
                question = generateAnalogyQuestion(questionSeed, difficulty);
                break;
            case 'odd_one_out':
                question = generateOddOneOutQuestion(questionSeed, difficulty);
                break;
        }

        questions.push(question);
    }

    // Sort by difficulty (easy first, then medium, then hard)
    questions.sort((a, b) => a.difficulty - b.difficulty);

    return questions;
}

// Calculate test results
export function calculateResults(questions: Question[], answers: (number | null)[]): TestResult {
    let rawScore = 0;
    let maxScore = 0;

    const categoryScores: Record<string, { correct: number; total: number; points: number; maxPoints: number }> = {
        matrix: { correct: 0, total: 0, points: 0, maxPoints: 0 },
        sequence: { correct: 0, total: 0, points: 0, maxPoints: 0 },
        analogy: { correct: 0, total: 0, points: 0, maxPoints: 0 },
        odd_one_out: { correct: 0, total: 0, points: 0, maxPoints: 0 },
    };

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answer = answers[i];
        const points = question.points;

        maxScore += points;
        categoryScores[question.type].total++;
        categoryScores[question.type].maxPoints += points;

        if (answer === question.correctIndex) {
            rawScore += points;
            categoryScores[question.type].correct++;
            categoryScores[question.type].points += points;
        }
    }

    // Calculate score band and percentile
    const percentage = (rawScore / maxScore) * 100;
    const { scoreBand, percentileBand } = getBands(percentage);

    // Prepare category scores
    const categoryResults: CategoryScore[] = [
        {
            category: 'Pattern Recognition',
            score: categoryScores.matrix.points,
            maxScore: categoryScores.matrix.maxPoints,
            description: 'Ability to identify patterns in matrices and grids',
        },
        {
            category: 'Sequential Reasoning',
            score: categoryScores.sequence.points,
            maxScore: categoryScores.sequence.maxPoints,
            description: 'Ability to understand and continue sequences',
        },
        {
            category: 'Analogical Thinking',
            score: categoryScores.analogy.points,
            maxScore: categoryScores.analogy.maxPoints,
            description: 'Ability to identify relationships between concepts',
        },
        {
            category: 'Visual Discrimination',
            score: categoryScores.odd_one_out.points,
            maxScore: categoryScores.odd_one_out.maxPoints,
            description: 'Ability to identify differences and categorize items',
        },
    ];

    // Determine strengths and areas for growth
    const sortedCategories = [...categoryResults].sort(
        (a, b) => (b.score / b.maxScore) - (a.score / a.maxScore)
    );

    const strengths = sortedCategories
        .filter(c => c.score / c.maxScore >= 0.6)
        .slice(0, 2)
        .map(c => c.category);

    const areasForGrowth = sortedCategories
        .filter(c => c.score / c.maxScore < 0.5)
        .slice(-2)
        .map(c => c.category);

    return {
        rawScore,
        maxScore,
        scoreBand,
        percentileBand,
        categoryScores: categoryResults,
        strengths: strengths.length > 0 ? strengths : ['General Reasoning'],
        areasForGrowth: areasForGrowth.length > 0 ? areasForGrowth : [],
    };
}

// Get score band and percentile band based on percentage
function getBands(percentage: number): { scoreBand: string; percentileBand: string } {
    if (percentage >= 95) {
        return { scoreBand: '130+', percentileBand: '98th+' };
    } else if (percentage >= 90) {
        return { scoreBand: '125-129', percentileBand: '95th-97th' };
    } else if (percentage >= 80) {
        return { scoreBand: '120-124', percentileBand: '91st-94th' };
    } else if (percentage >= 70) {
        return { scoreBand: '115-119', percentileBand: '84th-90th' };
    } else if (percentage >= 60) {
        return { scoreBand: '110-114', percentileBand: '75th-83rd' };
    } else if (percentage >= 50) {
        return { scoreBand: '105-109', percentileBand: '63rd-74th' };
    } else if (percentage >= 40) {
        return { scoreBand: '100-104', percentileBand: '50th-62nd' };
    } else if (percentage >= 30) {
        return { scoreBand: '95-99', percentileBand: '37th-49th' };
    } else if (percentage >= 20) {
        return { scoreBand: '90-94', percentileBand: '25th-36th' };
    } else if (percentage >= 10) {
        return { scoreBand: '85-89', percentileBand: '16th-24th' };
    } else {
        return { scoreBand: 'Below 85', percentileBand: 'Below 16th' };
    }
}

// Get time limit in seconds
export function getTimeLimit(): number {
    return TIME_LIMIT_SECONDS;
}

// Get total questions count
export function getQuestionsCount(): number {
    return QUESTIONS_COUNT;
}
