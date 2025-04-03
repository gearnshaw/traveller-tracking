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
  }
};
