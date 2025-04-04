import { useState, useCallback } from 'react';
import { LocationState } from '../types';
import { locationService } from '@/services/location';
import { savePositionAsLocation } from '../operations';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

type UseLocationProps = {
  onUpdate?: () => void;
};

const DUMMY_LOCATION: LocationState = {
  location: 'Unknown 🤔',
  time: '3:45 PM',
  temperature: '23°C',
  weather: 'Sunny',
  isLoading: false,
  error: null
};

export const useLocation = ({ onUpdate }: UseLocationProps = {}) => {
  const [locationState, setLocationState] = useState<LocationState>(DUMMY_LOCATION);
  const userId = useCurrentUser()?.userUid;

  const handleUpdate = useCallback(async () => {
    if (!userId) {
      setLocationState((prev) => ({
        ...prev,
        error: 'User not authenticated'
      }));
      return;
    }

    try {
      setLocationState((prev) => ({ ...prev, isLoading: true, error: null }));

      const position = await locationService.getCurrentPosition();
      if (!position) {
        throw new Error('Failed to get current position');
      }

      const savedLocation = await savePositionAsLocation(position, userId);

      setLocationState({
        ...DUMMY_LOCATION,
        location: savedLocation.description,
        isLoading: false
      });

      onUpdate?.();
    } catch (error: unknown) {
      setLocationState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update location'
      }));
      throw error; // Re-throw to be handled by the caller
    }
  }, [onUpdate, userId]);

  return {
    ...locationState,
    handleUpdate
  };
};
