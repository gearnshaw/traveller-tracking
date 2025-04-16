import { View } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { Typography } from '@/shared/components/base/Typography';
import Clock from '@/shared/components/base/Clock';
import { useAutoUpdatingRelativeTime } from '@/shared/hooks/useAutoUpdatingRelativeTime';

type LocationInfoProps = {
  location: string;
  timezone: string;
  temperature: string;
  weather: string;
  timestamp: number;
};

export const LocationInfo = ({
  location,
  timezone,
  temperature,
  weather,
  timestamp
}: LocationInfoProps) => {
  const relativeTime = useAutoUpdatingRelativeTime(timestamp);

  return (
    <View style={tw`flex-1`}>
      <Typography variant="cardSubheader">{location}</Typography>
      <Typography variant="body" style={tw`mt-1`}>
        <Clock timezone={timezone} /> • {temperature}, {weather}
      </Typography>
      <Typography variant="secondary" style={tw`mt-2 text-gray-500`}>
        Updated {relativeTime}
      </Typography>
    </View>
  );
};
