import { useState, useCallback } from 'react';
import { LocationState } from '../types';

type UseLocationProps = {
  onUpdate?: () => void;
};

const DUMMY_LOCATION: LocationState = {
  location: 'Barcelona, Spain',
  time: '3:45 PM',
  temperature: '23°C',
  weather: 'Sunny',
  isLoading: false,
  error: null,
  isLocationEnabled: false
};

export const useLocation = ({ onUpdate }: UseLocationProps = {}) => {
  const [locationState, setLocationState] = useState<LocationState>(DUMMY_LOCATION);

  const handleUpdate = useCallback(async () => {
    try {
      setLocationState((prev) => ({ ...prev, isLoading: true, error: null }));

      // TODO: Implement real location and weather API calls
      // For now, just simulate an API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLocationState(DUMMY_LOCATION);
      onUpdate?.();
    } catch (error) {
      setLocationState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update location'
      }));
    }
  }, [onUpdate]);

  return {
    ...locationState,
    handleUpdate
  };
};
