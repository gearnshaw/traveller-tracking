import { analytics } from './firebase';
import { ErrorEvent } from '@/shared/analytics/types';
import { log } from '@/services/logger';

// Helper function to log screen views
const logScreen = async (screenName: string, screenClass?: string) => {
  try {
    await analytics.logScreenView({
      screen_name: screenName,
      screen_class: screenClass || screenName
    });
  } catch (error) {
    log.error('Error logging screen view:', error);
  }
};

// Synchronous wrapper for screen logging
export const logScreenSync = (screenName: string, screenClass?: string) => {
  logScreen(screenName, screenClass).catch((error) => {
    log.error('Error in async screen logging:', error);
  });
};

// Helper function to log custom events
const logEvent = async (eventName: string, params?: Record<string, any>) => {
  try {
    await analytics.logEvent(eventName, {
      timestamp: Date.now(),
      ...params
    });
  } catch (error) {
    log.error('Error logging event:', error);
  }
};

// Synchronous wrapper for fire-and-forget analytics
export const logEventSync = (eventName: string, params?: Record<string, any>) => {
  logEvent(eventName, params).catch((error) => {
    log.error('Error in async analytics event:', error);
  });
};

// Helper function to log errors
const logError = async (errorEvent: ErrorEvent) => {
  try {
    await analytics.logEvent('error_occurred', {
      timestamp: Date.now(),
      ...errorEvent
    });
  } catch (error) {
    log.error('Error logging error event:', error);
  }
};

export const logErrorSync = (errorEvent: ErrorEvent) => {
  logError(errorEvent).catch((error) => {
    log.error('Error in async error logging:', error);
  });
};

// Helper function to set user properties
// export const setUserProperties = async (properties: Record<string, string>) => {
//   try {
//     await analytics.setUserProperties(properties);
//   } catch (error) {
//     log.error('Error setting user properties:', error);
//   }
// };
