import { Text, StyleProp, TextStyle } from 'react-native';
import { useClock } from '@/shared/hooks/useClock';

export type ClockProps = {
  style?: StyleProp<TextStyle>;
};

const Clock = ({ style }: ClockProps) => {
  const time = useClock();

  return (
    <Text style={style} accessibilityRole="text" accessibilityLabel={`Current time is ${time}`}>
      {time}
    </Text>
  );
};

export default Clock;
