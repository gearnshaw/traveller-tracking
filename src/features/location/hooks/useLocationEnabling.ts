import { useCallback, useState } from 'react';
import { useLocationUpdater } from './useLocationUpdater';
import { locationService } from '@/services/location';
import { locationLogger } from '../logger';

export const useLocationEnabling = (onUpdate?: () => void) => {
  const { handleUpdate } = useLocationUpdater({ onUpdate });
  const [error, setError] = useState<string | null>(null);

  const enableLocation = useCallback(async () => {
    try {
      setError(null);
      // Request location permissions
      const hasPermission = await locationService.requestPermissions();

      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      // If permissions granted, proceed with location update
      await handleUpdate();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to enable location';
      setError(errorMessage);
      locationLogger.error('Location enabling failed:', errorMessage);
    }
  }, [handleUpdate]);

  return {
    enableLocation,
    error
  };
};
