import { useState, useCallback } from 'react';
import { LocationState } from '../types';
import { locationService } from '@/services/location';

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

  const handleUpdate = useCallback(async () => {
    try {
      setLocationState((prev) => ({ ...prev, isLoading: true, error: null }));

      const position = await locationService.getCurrentPosition();

      if (!position) {
        throw new Error('Failed to get current position');
      }

      const formattedLocation = `${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)}`;

      setLocationState({
        ...DUMMY_LOCATION,
        location: formattedLocation,
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
  }, [onUpdate]);

  return {
    ...locationState,
    handleUpdate
  };
};
