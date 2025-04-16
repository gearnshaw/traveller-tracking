import { View } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { Typography } from '@/shared/components/base/Typography';
import Clock from '@/shared/components/base/Clock';
import { useRelativeTime } from '@/shared/hooks/useRelativeTime';

type LocationInfoProps = {
  location: string;
  temperature: string;
  weather: string;
  timestamp: number;
};

export const LocationInfo = ({ location, temperature, weather, timestamp }: LocationInfoProps) => {
  const relativeTime = useRelativeTime(timestamp);

  return (
    <View style={tw`flex-1`}>
      <Typography variant="cardSubheader">{location}</Typography>
      <Typography variant="body" style={tw`mt-1`}>
        <Clock /> • {temperature}, {weather}
      </Typography>
      <Typography variant="secondary" style={tw`mt-2 text-gray-500`}>
        Updated {relativeTime}
      </Typography>
    </View>
  );
};
