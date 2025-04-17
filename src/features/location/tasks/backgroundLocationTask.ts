import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { saveOrUpdateLocation } from '../actions';
import { authService } from '@/services/auth';

// Define the task name
export const BACKGROUND_LOCATION_TASK = 'background-location-task';

// Define the task handler
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const userId = authService.getCurrentUserId();

    if (!userId) {
      console.error('No user ID available for background location task');
      return;
    }

    try {
      // Process each location update
      for (const location of locations) {
        const { latitude, longitude } = location.coords;
        const { timestamp } = location;

        // Save or update the location
        console.log(`👾👾👾👾 calling saveOrUpdateLocation from background location task`); // TODO: GLE remove
        await saveOrUpdateLocation({ latitude, longitude }, timestamp, userId);
      }
    } catch (error) {
      console.error('Error processing background location:', error);
    }
  }
});

/**
 * Register the background location task
 * @returns Promise<boolean> - Whether the task was successfully registered
 */
export const registerBackgroundLocationTask = async (): Promise<boolean> => {
  try {
    // Check if task is already registered
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
    if (isRegistered) {
      return true;
    }

    // Register the task
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
      accuracy: Location.Accuracy.Lowest,
      deferredUpdatesInterval: 3 * 60 * 60 * 1000, // 3 hours
      distanceInterval: 1000, // 1km
      pausesUpdatesAutomatically: true,
      foregroundService: {
        notificationTitle: 'City Sharing Active',
        notificationBody:
          'Traveller Tracking is monitoring your location to share your city with your followers'
      }
    });

    return true;
  } catch (error) {
    console.error('Error registering background location task:', error);
    return false;
  }
};

/**
 * Unregister the background location task
 * @returns Promise<boolean> - Whether the task was successfully unregistered
 */
export const unregisterBackgroundLocationTask = async (): Promise<boolean> => {
  try {
    // Check if task is registered
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
    if (!isRegistered) {
      return true;
    }

    // Stop location updates
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);

    return true;
  } catch (error) {
    console.error('Error unregistering background location task:', error);
    return false;
  }
};
