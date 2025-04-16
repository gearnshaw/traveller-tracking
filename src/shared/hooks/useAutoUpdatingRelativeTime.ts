import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import { useAppState } from './useAppState';

/**
 * Hook that returns a relative time string that updates automatically when the description should change.
 * Handles app state transitions (background/foreground) to ensure accuracy.
 *
 * @param date The date to format
 * @returns A relative time string (e.g. "2 hours ago", "just now", etc.)
 */
export const useAutoUpdatingRelativeTime = (date: Date | number): string => {
  const [relativeTime, setRelativeTime] = useState<string>(formatRelativeTime(date));
  const timerRef = useRef<NodeJS.Timeout>();
  const appState = useAppState();

  // Calculate the next time the relative time description should change
  const calculateNextUpdateTime = useMemo(() => {
    const timestamp = date instanceof Date ? date.getTime() : date;
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    // Define time thresholds (in seconds)
    const thresholds = {
      justNow: 30,
      lastHour: 60 * 60,
      day: 24 * 60 * 60,
      week: 7 * 24 * 60 * 60,
      month: 30 * 24 * 60 * 60,
      year: 365 * 24 * 60 * 60
    };

    // Find the next threshold
    let nextThreshold = thresholds.justNow;
    if (seconds < thresholds.justNow) {
      nextThreshold = thresholds.justNow;
    } else if (seconds < thresholds.lastHour) {
      nextThreshold = thresholds.lastHour;
    } else if (seconds < thresholds.day) {
      nextThreshold = thresholds.day;
    } else if (seconds < thresholds.week) {
      nextThreshold = thresholds.week;
    } else if (seconds < thresholds.month) {
      nextThreshold = thresholds.month;
    } else if (seconds < thresholds.year) {
      nextThreshold = thresholds.year;
    } else {
      // For very old timestamps, update every year
      return 365 * 24 * 60 * 60 * 1000;
    }

    // Calculate milliseconds until next threshold
    const nextUpdateInSeconds = nextThreshold - (seconds % nextThreshold);
    return nextUpdateInSeconds * 1000;
  }, [date]);

  // Update the relative time and schedule next update
  const updateRelativeTime = useCallback(() => {
    setRelativeTime(formatRelativeTime(date));
    const nextUpdate = calculateNextUpdateTime;
    timerRef.current = setTimeout(updateRelativeTime, nextUpdate);
  }, [date, calculateNextUpdateTime]);

  // Set up initial timer and handle app state changes
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Update immediately when app comes to foreground
    if (appState === 'active') {
      updateRelativeTime();
    }

    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [date, appState, updateRelativeTime]);

  return relativeTime;
};
