import { View, ActivityIndicator } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { useLocationDisplay } from '../hooks/useLocationDisplay';
import { useLocationUpdater } from '../hooks/useLocationUpdater';
import { useLocationTrackingStatus } from '../hooks/useLocationTrackingStatus';
import { Typography } from '@/shared/components/base/Typography';
import { Card } from '@/shared/components/base/Card';
import { TableSectionHeader } from '@/shared/components/base/TableSectionHeader';
import { Button } from '@/shared/components/base/Button';
import { LocationRequired } from './LocationRequired';

type LocationCardProps = {
  onUpdate?: () => void;
};

export const LocationCard = ({ onUpdate }: LocationCardProps) => {
  const trackingStatus = useLocationTrackingStatus();
  const { location, time, temperature, weather } = useLocationDisplay();
  const { isLoading, handleUpdate } = useLocationUpdater({ onUpdate });

  // Don't render anything if tracking is not required
  if (trackingStatus === 'not-required') {
    return null;
  }

  return (
    <View>
      <TableSectionHeader title="My Location" />
      <Card style={tw`p-4`}>
        {trackingStatus === 'required' ? (
          <LocationRequired onUpdate={onUpdate} />
        ) : (
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-1`}>
              <Typography variant="cardSubheader">{location}</Typography>
              <Typography variant="body" style={tw`mt-1`}>
                {time} • {temperature}, {weather}
              </Typography>
              <Typography variant="secondary" style={tw`mt-2 text-gray-500`}>
                Updated just now
              </Typography>
            </View>
            <Button
              onPress={handleUpdate}
              disabled={isLoading}
              style={tw`min-w-[80px]`}
              accessibilityLabel="Update location"
              accessibilityState={{ disabled: isLoading }}
            >
              {isLoading ? <ActivityIndicator color="white" size="small" /> : 'Update'}
            </Button>
          </View>
        )}
      </Card>
    </View>
  );
};
