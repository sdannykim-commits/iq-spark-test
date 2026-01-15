import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Client-side Supabase client (uses anon key)
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
    return !!supabase;
};

// Server-side client with service role (for API routes)
export const createServerClient = () => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return null;
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};

// Type definitions for database tables
export interface Attempt {
    id: string;
    created_at: string;
    locale: string;
    seed: string;
    user_email: string | null;
    started_at: string | null;
    completed_at: string | null;
    answers: number[] | null;
    raw_score: number | null;
    max_score: number | null;
    score_band: string | null;
    percentile_band: string | null;
    report_unlocked: boolean;
}

export interface Payment {
    id: string;
    created_at: string;
    attempt_id: string;
    stripe_session_id: string;
    stripe_payment_intent_id: string | null;
    amount_cents: number;
    currency: string;
    status: 'pending' | 'completed' | 'refunded' | 'failed';
    paid_at: string | null;
    refunded_at: string | null;
    email: string | null;
}
