import { useState, useCallback } from 'react';
import { locationService } from '@/services/location';
import { saveOrUpdateLocation } from '../actions';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { trackLocationUpdatedManually } from '../analytics';
import { locationLogger } from '../logger';

type UseLocationUpdaterProps = {
  onUpdate?: () => void;
};

export const useLocationUpdater = ({ onUpdate }: UseLocationUpdaterProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = useCurrentUser()?.userUid;

  const handleUpdate = useCallback(async () => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      locationLogger.debug('Location updater loading');
      setIsLoading(true);
      setError(null);

      const position = await locationService.getCurrentPosition();
      if (!position) {
        throw new Error('Failed to get current position');
      }

      locationLogger.debug('Location updater saving location');
      await saveOrUpdateLocation(
        {
          latitude: position.latitude,
          longitude: position.longitude
        },
        Date.now(),
        userId
      );
      trackLocationUpdatedManually();
      onUpdate?.();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update location';
      setError(errorMessage);
      locationLogger.error('Location update failed:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [onUpdate, userId]);

  return {
    isLoading,
    error,
    handleUpdate
  };
};
