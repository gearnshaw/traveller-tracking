import { Text, StyleProp, TextStyle } from 'react-native';
import { useClock } from '@/shared/hooks/useClock';

export type ClockProps = {
  style?: StyleProp<TextStyle>;
  timezone?: string;
};

const Clock = ({ style, timezone }: ClockProps) => {
  const time = useClock(timezone);

  return (
    <Text
      style={style}
      accessibilityRole="text"
      accessibilityLabel={`Current time${timezone ? ` in ${timezone}` : ''} is ${time}`}
    >
      {time}
    </Text>
  );
};

export default Clock;
