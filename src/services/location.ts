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
  },

  /**
   * Get the current position of the device
   * @returns Promise<{ latitude: number; longitude: number } | null> - The current coordinates or null if unavailable
   */
  getCurrentPosition: async (): Promise<{ latitude: number; longitude: number } | null> => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest
      });

      console.log(`👾👾👾👾 ${JSON.stringify(location)}`); // TODO: GLE remove

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    } catch (error) {
      console.error('Error getting current position:', error);
      return null;
    }
  }
};
