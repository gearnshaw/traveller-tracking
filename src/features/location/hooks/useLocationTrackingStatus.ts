import { useEffect, useState } from 'react';
import { LocationTrackingStatus } from '../types';
import { locationService } from '@/services/location';
import { useAppState } from '@/shared/hooks/useAppState';
import { locationLogger } from '../logger';

/**
 * Hook to get the user's location tracking status
 * @returns Object containing tracking status and error state
 */
export const useLocationTrackingStatus = () => {
  const [status, setStatus] = useState<LocationTrackingStatus>('required');
  const [error, setError] = useState<string | null>(null);

  // Use useAppState to detect when app comes to foreground
  useAppState(
    // When app comes to foreground, recheck permissions
    async (state) => {
      if (state === 'active') {
        try {
          setError(null);
          const hasPermissions = await locationService.checkPermissions();
          setStatus(hasPermissions ? 'active' : 'required');
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to check permissions';
          setError(errorMessage);
          locationLogger.error('Error checking permissions:', errorMessage);
        }
      }
    }
  );

  // Initial check of permissions
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setError(null);
        const hasPermissions = await locationService.checkPermissions();
        setStatus(hasPermissions ? 'active' : 'required');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to check permissions';
        setError(errorMessage);
        locationLogger.error('Error checking permissions:', errorMessage);
      }
    };

    checkStatus();
  }, []);

  return {
    status,
    error
  };
};
