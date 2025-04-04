import { useState, useEffect } from 'react';
import { LocationInfo, Location } from '../types';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { locationApi } from '../api';

const DUMMY_LOCATION: LocationInfo = {
  location: 'Unknown 🤔',
  time: '3:45 PM',
  temperature: '23°C',
  weather: 'Sunny'
};

type UseLocationDisplayProps = {
  onLocationChange?: (location: Location | null) => void;
};

export const useLocationDisplay = ({ onLocationChange }: UseLocationDisplayProps = {}) => {
  const [locationState, setLocationState] = useState<LocationInfo>(DUMMY_LOCATION);
  const userId = useCurrentUser()?.userUid;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const unsubscribe = locationApi.observeLatestLocation(userId, (location) => {
      if (location) {
        setLocationState({
          ...DUMMY_LOCATION,
          location: location.description
        });
        onLocationChange?.(location);
      }
    });

    return () => unsubscribe();
  }, [userId, onLocationChange]);

  return locationState;
};
