import { Button } from '@/shared/components/base/Button';
import { useBackgroundLocation } from '../hooks/useBackgroundLocation';
import { tw } from '@/shared/utils/tw';

export const LocationTrackingButton = () => {
  const { isTracking, error, startTracking, stopTracking } = useBackgroundLocation();

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

  return (
    <Button
      onPress={handleTrackingToggle}
      disabled={!!error}
      variant={isTracking ? 'secondary' : 'primary'}
      style={tw`mt-4`}
      accessibilityLabel={getTrackingButtonText()}
      accessibilityState={{ disabled: !!error }}
    >
      {getTrackingButtonText()}
    </Button>
  );
};
