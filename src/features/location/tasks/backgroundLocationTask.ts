import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { saveOrUpdateLocation } from '../actions';
import { authService } from '@/services/auth';
import { BACKGROUND_LOCATION_TASK } from './taskNames';
import { trackBackgroundLocationError, trackBackgroundLocationStarted } from '../analytics';
import { userDocumentApi } from '@/shared/api/userDocument';
import { locationLogger } from '../logger';

// Define the task handler
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  const userId = authService.getCurrentUserId();
  if (error) {
    locationLogger.error(`Background location task error: ${JSON.stringify(error)}`);
    trackBackgroundLocationError(error.message, {
      source: 'background_location_task',
      code: error.code
    });

    // Update user's last error timestamp
    if (userId) {
      await userDocumentApi.updateUser(userId, {
        dtLastLocationError: new Date()
      });
    }
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    locationLogger.debug(`List of locations received (${locations.length})`);

    if (!userId) {
      locationLogger.error('No user ID available for background location task');
      return;
    }

    try {
      const latestLocation = locations.reduce((prev, current) => {
        return prev.timestamp > current.timestamp ? prev : current;
      });

      const { latitude, longitude } = latestLocation.coords;
      const { timestamp } = latestLocation;

      // Save or update the location
      await saveOrUpdateLocation({ latitude, longitude }, timestamp, userId);
    } catch (error) {
      locationLogger.error('Error processing background location:', { error });
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
      deferredUpdatesInterval: 60 * 60 * 1000, // 1 hour
      distanceInterval: 1000, // 1km
      pausesUpdatesAutomatically: true,
      foregroundService: {
        notificationTitle: 'City Sharing Active',
        notificationBody:
          'Traveller Tracking is monitoring your location to share your city with your followers'
      }
    });

    trackBackgroundLocationStarted();
    locationLogger.info('Background location task registered successfully');

    return true;
  } catch (error) {
    locationLogger.error('Error registering background location task:', { error });
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
    locationLogger.info('Background location task unregistered successfully');

    return true;
  } catch (error) {
    locationLogger.error('Error unregistering background location task:', { error });
    return false;
  }
};
