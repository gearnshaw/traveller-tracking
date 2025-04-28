import { track } from './mixpanel';
import { ErrorEvent } from '@/shared/analytics/types';

// Helper function to log screen views
export const logScreen = (screenName: string, screenClass?: string) => {
  track('screen_view', {
    screen_name: screenName,
    screen_class: screenClass || screenName
  });
};

// Helper function to log custom events
export const logEvent = (eventName: string, params?: Record<string, any>) => {
  track(eventName, {
    ...params
  });
};

export const logError = async (errorEvent: ErrorEvent) => {
  track('error_occurred', {
    ...errorEvent
  });
};
