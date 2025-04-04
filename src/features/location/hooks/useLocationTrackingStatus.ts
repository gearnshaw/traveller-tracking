import { useEffect, useState } from 'react';
import { LocationTrackingStatus } from '../types';
import { locationService } from '@/services/location';

/**
 * Hook to get the user's location tracking status
 * @returns The current location tracking status
 */
export const useLocationTrackingStatus = (): LocationTrackingStatus => {
  const [status, setStatus] = useState<LocationTrackingStatus>('required');

  useEffect(() => {
    const checkStatus = async () => {
      const hasPermissions = await locationService.checkPermissions();
      setStatus(hasPermissions ? 'active' : 'required');
    };

    checkStatus();
  }, []);

  return status;
};
