import { logErrorSync, logEventSync } from '@/services/analytics';

// Location-specific event names
export const LocationEvents = {
  BACKGROUND_LOCATION_STARTED: 'background_location_started',
  BACKGROUND_LOCATION_STOPPED: 'background_location_stopped',
  BACKGROUND_LOCATION_ERROR: 'background_location_error',
  LOCATION_UPDATED_MANUALLY: 'location_updated_manually'
} as const;

// Location-specific analytics functions
export const trackBackgroundLocationStarted = () => {
  logEventSync(LocationEvents.BACKGROUND_LOCATION_STARTED);
};

export const trackBackgroundLocationStopped = () => {
  logEventSync(LocationEvents.BACKGROUND_LOCATION_STOPPED);
};

export const trackLocationUpdatedManually = () => {
  logEventSync(LocationEvents.LOCATION_UPDATED_MANUALLY);
};

export const trackBackgroundLocationError = (
  errorMessage: string,
  context?: Record<string, any>
) => {
  logErrorSync({
    errorCode: 'background_location_error',
    errorMessage,
    context
  });
};
