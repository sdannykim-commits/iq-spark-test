import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Seeded random number generator for reproducible results
export function seededRandom(seed: string): () => number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return function () {
        hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
        hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
        hash ^= hash >>> 16;
        return (hash >>> 0) / 4294967296;
    };
}

// Shuffle array with seeded random
export function shuffleArray<T>(array: T[], random: () => number): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Generate unique ID
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Format time for timer display
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Calculate score band from raw score
export function getScoreBand(rawScore: number, maxScore: number): string {
    const percentage = (rawScore / maxScore) * 100;

    if (percentage >= 95) return "130+";
    if (percentage >= 85) return "120-129";
    if (percentage >= 70) return "110-119";
    if (percentage >= 50) return "100-109";
    if (percentage >= 30) return "90-99";
    if (percentage >= 15) return "80-89";
    return "Below 80";
}

// Calculate percentile band
export function getPercentileBand(rawScore: number, maxScore: number): string {
    const percentage = (rawScore / maxScore) * 100;

    if (percentage >= 95) return "98th+";
    if (percentage >= 85) return "91st-97th";
    if (percentage >= 70) return "75th-90th";
    if (percentage >= 50) return "50th-74th";
    if (percentage >= 30) return "25th-49th";
    if (percentage >= 15) return "9th-24th";
    return "Below 9th";
}
