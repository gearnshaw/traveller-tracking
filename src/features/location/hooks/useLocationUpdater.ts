import { useState, useCallback } from 'react';
import { locationService } from '@/services/location';
import { saveOrUpdateLocation } from '../actions';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

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
      setIsLoading(true);
      setError(null);

      const position = await locationService.getCurrentPosition();
      if (!position) {
        throw new Error('Failed to get current position');
      }

      await saveOrUpdateLocation(position, userId);
      onUpdate?.();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update location';
      setError(errorMessage);
      throw error;
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
