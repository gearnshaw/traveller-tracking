import { useEffect, useState } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

export type ClockProps = {
  style?: StyleProp<TextStyle>;
};

const Clock = ({ style }: ClockProps) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();

      // Format time according to user's locale settings
      const timeFormatter = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: undefined // Let the locale decide 12/24 hour format
      });

      setTime(timeFormatter.format(now));

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
  }, []);

  return (
    <Text style={style} accessibilityRole="text" accessibilityLabel={`Current time is ${time}`}>
      {time}
    </Text>
  );
};

export default Clock;
