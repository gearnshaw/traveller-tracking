import { View } from 'react-native';
import { Button } from '@/shared/components/base/Button';
import { useBackgroundLocation } from '../hooks/useBackgroundLocation';
import { useLocationError } from '../hooks/useLocationError';
import { tw } from '@/shared/utils/tw';

export const LocationTrackingButton = () => {
  const { isTracking, error, startTracking, stopTracking } = useBackgroundLocation();
  const hasLocationError = useLocationError();

  const handleTrackingToggle = async () => {
    if (isTracking) {
      await stopTracking();
    } else {
      await startTracking();
    }
  };

  const getTrackingButtonText = () => {
    if (error) return 'Tracking error';
    return isTracking ? 'Stop tracking' : 'Start tracking';
  };

  const getStatusColor = () => {
    if (error || hasLocationError) return 'bg-red-500';
    return isTracking ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <View style={tw`flex-row items-center`}>
      <Button
        onPress={handleTrackingToggle}
        disabled={!!error}
        variant={isTracking ? 'secondary' : 'primary'}
        style={tw`mt-4 flex-1`}
        accessibilityLabel={getTrackingButtonText()}
        accessibilityState={{ disabled: !!error }}
      >
        {getTrackingButtonText()}
      </Button>
      <View
        style={tw`w-3 h-3 rounded-full ${getStatusColor()} ml-2 mt-4`}
        accessibilityLabel={
          error || hasLocationError ? 'Location tracking error' : 'Location tracking active'
        }
      />
    </View>
  );
};
