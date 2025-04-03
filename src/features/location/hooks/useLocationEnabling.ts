import { useCallback } from 'react';
import { useLocation } from './useLocation';
import { locationService } from '@/services/location';

export const useLocationEnabling = (onUpdate?: () => void) => {
  const { handleUpdate } = useLocation({ onUpdate });

  const enableLocation = useCallback(async () => {
    try {
      // Request location permissions
      const hasPermission = await locationService.requestPermissions();

      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      // If permissions granted, proceed with location update
      await handleUpdate();
    } catch (error) {
      // Re-throw the error to be handled by the component
      throw error;
    }
  }, [handleUpdate]);

  return {
    enableLocation
  };
};
