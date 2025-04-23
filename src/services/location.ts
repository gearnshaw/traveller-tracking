import * as Location from 'expo-location';
import { ReverseGeocodeCity } from '@/features/location/types';
import * as TaskManager from 'expo-task-manager';
import { BACKGROUND_LOCATION_TASK } from '@/features/location/tasks/taskNames';
import { log } from '@/services/logger';

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
      log.error('Error requesting location permissions:', error);
      return false;
    }
  },

  /**
   * Check if location permissions are enabled
   * @returns Promise<boolean> - Whether permissions are currently granted
   */
  checkPermissions: async (): Promise<boolean> => {
    try {
      const result = await Location.getBackgroundPermissionsAsync();
      log.debug(`${JSON.stringify(result)}`); // TODO: GLE remove
      const { status } = result;
      return status === 'granted';
    } catch (error) {
      log.error('Error checking location permissions:', error);
      return false;
    }
  },

  /**
   * Check if background location tracking is active
   * @returns Promise<boolean> - Whether background tracking is active
   */
  isBackgroundTrackingActive: async (): Promise<boolean> => {
    try {
      return await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
    } catch (error) {
      log.error('Error checking background tracking status:', error);
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

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    } catch (error) {
      log.error('Error getting current position:', error);
      return null;
    }
  },

  /**
   * Reverse geocode coordinates to get the city information
   * @param latitude - The latitude coordinate
   * @param longitude - The longitude coordinate
   * @returns Promise<ReverseGeocodeCity | null> - The city information or null if unavailable
   */
  getCityFromCoordinates: async (
    latitude: number,
    longitude: number
  ): Promise<ReverseGeocodeCity | null> => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (address && address.length > 0) {
        const result = address[0];
        if (result.city && result.region && result.isoCountryCode && result.timezone) {
          return {
            city: result.city,
            region: result.region,
            isoCountryCode: result.isoCountryCode,
            timezone: result.timezone
          };
        }
      }

      return null;
    } catch (error) {
      log.error('Error reverse geocoding location:', error);
      return null;
    }
  }
};
