import { LocationTrackingStatus } from '../types';

/**
 * Hook to get the user's location tracking status
 * @returns The current location tracking status
 */
export const useLocationTrackingStatus = (): LocationTrackingStatus => {
  // TODO: Implement real tracking status logic
  // For now, return a hardcoded value

  // Expect it will be something like:
  // - 'active' if the user has location tracking enabled
  // - 'not-required' if the user has no followers
  // - 'required' if the user has followers

  return 'active';
  // return 'required';
  // return 'not-required';
};
