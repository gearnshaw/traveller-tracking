import { LocationTrackingStatus } from '../types';

/**
 * Hook to get the user's location tracking status
 * @returns The current location tracking status
 */
export const useLocationTrackingStatus = (): LocationTrackingStatus => {
  // TODO: Implement real tracking status logic
  // For now, return a hardcoded value
  return 'active';
};
