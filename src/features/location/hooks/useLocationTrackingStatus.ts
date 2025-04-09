import { useEffect, useState } from 'react';
import { LocationTrackingStatus } from '../types';
import { locationService } from '@/services/location';
import { useAppState } from '@/shared/hooks/useAppState';

/**
 * Hook to get the user's location tracking status
 * @returns The current location tracking status
 */
export const useLocationTrackingStatus = (): LocationTrackingStatus => {
  const [status, setStatus] = useState<LocationTrackingStatus>('required');

  // Use useAppState to detect when app comes to foreground
  useAppState(
    // When app comes to foreground, recheck permissions
    async (state) => {
      if (state === 'active') {
        const hasPermissions = await locationService.checkPermissions();
        setStatus(hasPermissions ? 'active' : 'required');
      }
    }
  );

  // Initial check of permissions
  useEffect(() => {
    const checkStatus = async () => {
      const hasPermissions = await locationService.checkPermissions();
      setStatus(hasPermissions ? 'active' : 'required');
    };

    checkStatus();
  }, []);

  return status;
};
