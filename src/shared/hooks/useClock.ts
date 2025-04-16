import { useState, useEffect } from 'react';
import { toZonedTime, format } from 'date-fns-tz';

export const useClock = (timezone?: string) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      let formattedTime: string;

      if (timezone) {
        // Convert to the specified timezone
        const zonedDate = toZonedTime(now, timezone);
        formattedTime = format(zonedDate, 'HH:mm', { timeZone: timezone });
      } else {
        // Use local time if no timezone specified
        const timeFormatter = new Intl.DateTimeFormat(undefined, {
          hour: 'numeric',
          minute: '2-digit',
          hour12: undefined // Let the locale decide 12/24 hour format
        });
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
  }, [timezone]);

  return time;
};
