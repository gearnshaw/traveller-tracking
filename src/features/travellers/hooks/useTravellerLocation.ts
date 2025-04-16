import { useEffect, useState } from 'react';
import { Location } from '@/features/location/types';
import { locationApi } from '@/features/location/api';

export const useTravellerLocation = (travellerId: string) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = locationApi.observeLatestLocation(travellerId, (location) => {
      setLocation(location);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [travellerId]);

  return { location, isLoading };
};
