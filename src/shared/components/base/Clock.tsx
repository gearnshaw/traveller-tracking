import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { tw } from '@/shared/utils/tw';

export type ClockProps = {
  style?: any;
};

const Clock = ({ style }: ClockProps) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Format time in 12-hour format with AM/PM
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedMinutes = minutes.toString().padStart(2, '0');

      setTime(`${formattedHours}:${formattedMinutes} ${ampm}`);

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
