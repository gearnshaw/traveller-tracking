import { useMemo } from 'react';
import { formatRelativeTime } from '../utils/formatRelativeTime';

/**
 * Hook that returns a relative time string.
 *
 * @param date The date to format
 * @returns A relative time string (e.g. "2 hours ago", "just now", etc.)
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const relativeTime = useRelativeTime(new Date('2024-01-01'));
 *   return <Text>{relativeTime}</Text>;
 * };
 * ```
 */
export const useRelativeTime = (date: Date | number): string => {
  return useMemo(() => formatRelativeTime(date), [date]);
};
