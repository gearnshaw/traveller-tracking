import { useState, useEffect } from 'react';
import { toZonedTime } from 'date-fns-tz';

// Get local timezone once when the module loads
const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Shared time formatter that respects device preferences
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
  hour12: undefined // Let the locale decide 12/24 hour format
});

export const useClock = (timezone?: string) => {
  const [time, setTime] = useState<string>('');
  const [timezoneOffset, setTimezoneOffset] = useState<string>('');

  // Calculate timezone offset when timezone changes
  useEffect(() => {
    if (timezone) {
      const now = new Date();
      const localDate = toZonedTime(now, localTimezone);
      const targetDate = toZonedTime(now, timezone);
      const hoursOffset = Math.round(
        (targetDate.getTime() - localDate.getTime()) / (60 * 60 * 1000)
      );
      setTimezoneOffset(hoursOffset !== 0 ? ` (${hoursOffset > 0 ? '+' : ''}${hoursOffset})` : '');
    } else {
      setTimezoneOffset('');
    }
  }, [timezone]);

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      let formattedTime: string;

      if (timezone) {
        // Convert to the specified timezone
        const zonedDate = toZonedTime(now, timezone);
        formattedTime = timeFormatter.format(zonedDate) + timezoneOffset;
      } else {
        // Use local time if no timezone specified
        formattedTime = timeFormatter.format(now);
      }

      setTime(formattedTime);

      // Calculate time until next minute
      const secondsUntilNextMinute = 60 - now.getSeconds();
      const millisecondsUntilNextMinute = secondsUntilNextMinute * 1000;

      // Schedule next update for the start of the next minute
      const timeoutId = setTimeout(updateTime, millisecondsUntilNextMinute);

      // Clean up timeout on unmount
      return () => clearTimeout(timeoutId);
    };

    // Initial update
    updateTime();
  }, [timezone, timezoneOffset]);

  return time;
};
