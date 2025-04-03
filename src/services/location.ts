import * as Location from 'expo-location';

/**
 * Location service for handling location-related operations
 */
export const locationService = {
  /**
   * Request location permissions from the user
   * @returns Promise<boolean> - Whether permissions were granted
   */
  requestPermissions: async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  },

  /**
   * Check if location permissions are enabled
   * @returns Promise<boolean> - Whether permissions are currently granted
   */
  checkPermissions: async (): Promise<boolean> => {
    try {
      const { status } = await Location.getBackgroundPermissionsAsync();
      console.log('Location status:', status);
      return status === 'granted';
    } catch (error) {
      console.error('Error checking location permissions:', error);
      return false;
    }
  }
};
