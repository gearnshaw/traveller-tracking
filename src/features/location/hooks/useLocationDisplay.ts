import { useState, useEffect } from 'react';
import { LocationInfo, Location } from '../types';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { locationApi } from '../api';
import { locationLogger } from '../logger';

const DUMMY_LOCATION = {
  location: 'Unknown 🤷‍♀️',
  time: '3:45 PM',
  timestamp: Date.now(),
  timezone: 'UTC'
};

const weatherInfo = {
  temperature: '23°C',
  weather: 'Sunny'
};

type UseLocationDisplayProps = {
  onLocationChange?: (location: Location | null) => void;
};

export const useLocationDisplay = ({ onLocationChange }: UseLocationDisplayProps = {}) => {
  const [locationState, setLocationState] = useState<LocationInfo>({
    location: 'Unknown',
    time: '3:45 PM',
    timestamp: Date.now(),
    timezone: 'UTC',
    ...weatherInfo
  });
  const userId = useCurrentUser()?.userUid;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const unsubscribe = locationApi.observeLatestLocation(userId, (location) => {
      locationLogger.debug(`Received an update of the TT location: ${JSON.stringify(location)}`);

      if (location) {
        setLocationState({
          ...DUMMY_LOCATION,
          location: location.city + ', ' + location.isoCountryCode,
          timestamp: location.dtLastUpdated.getTime(),
          timezone: location.timezone,
          ...weatherInfo
        });
        onLocationChange?.(location);
      }
    });

    return () => unsubscribe();
  }, [userId, onLocationChange]);

  return locationState;
};
