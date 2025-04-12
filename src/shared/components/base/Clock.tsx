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
    };

    // Update time immediately
    updateTime();

    // Set up interval to update every minute
    const intervalId = setInterval(updateTime, 60000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Text style={style} accessibilityRole="text" accessibilityLabel={`Current time is ${time}`}>
      {time}
    </Text>
  );
};

export default Clock;
