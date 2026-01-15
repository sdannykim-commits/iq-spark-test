'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { formatTime } from '@/lib/utils';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
    initialSeconds: number;
    onTimeUp: () => void;
    isRunning: boolean;
}

export function Timer({ initialSeconds, onTimeUp, isRunning }: TimerProps) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, onTimeUp]);

    const percentage = (seconds / initialSeconds) * 100;
    const isLow = seconds <= 60; // 1 minute warning
    const isCritical = seconds <= 30; // 30 seconds critical

    return (
        <div className={`
      flex items-center gap-2 px-4 py-2 rounded-lg
      ${isCritical ? 'bg-red-500/20 text-red-400' :
                isLow ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-card/50 text-muted-foreground'}
    `}>
            {isCritical ? (
                <AlertTriangle className="h-4 w-4 animate-pulse" />
            ) : (
                <Clock className="h-4 w-4" />
            )}
            <span className="font-mono font-semibold">
                {formatTime(seconds)}
            </span>
        </div>
    );
}
