import { View, ActivityIndicator } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { useLocationDisplay } from '../hooks/useLocationDisplay';
import { useLocationUpdater } from '../hooks/useLocationUpdater';
import { useLocationTrackingStatus } from '../hooks/useLocationTrackingStatus';
import { Card } from '@/shared/components/base/Card';
import { TableSectionHeader } from '@/shared/components/base/TableSectionHeader';
import { Button } from '@/shared/components/base/Button';
import { LocationRequired } from './LocationRequired';
import { LocationTrackingButton } from './LocationTrackingButton';
import { LocationInfo } from '@/shared/components/common/LocationInfo';

type LocationCardProps = {
  onUpdate?: () => void;
};

export const LocationCard = ({ onUpdate }: LocationCardProps) => {
  const trackingStatus = useLocationTrackingStatus();
  const { location, temperature, weather, timestamp, timezone } = useLocationDisplay();
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
          <View>
            <View style={tw`flex-row justify-between items-center`}>
              <LocationInfo
                location={location}
                timezone={timezone}
                temperature={temperature}
                weather={weather}
                timestamp={timestamp}
              />
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
            <LocationTrackingButton />
          </View>
        )}
      </Card>
    </View>
  );
};
