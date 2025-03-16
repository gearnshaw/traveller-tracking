import { analyticsInstance } from "./firebase";

export type AnalyticsParams = {
  [key: string]: any;
};

export interface AnalyticsService {
  // Screen tracking
  logScreen(screenName: string, screenClass?: string): Promise<void>;

  // User properties
  setUserProperties(properties: AnalyticsParams): Promise<void>;

  // Custom events
  logEvent(eventName: string, params?: AnalyticsParams): Promise<void>;

  // Trip-related events
  logTripCreated(tripId: string, tripName: string): Promise<void>;
  logTripUpdated(tripId: string, tripName: string): Promise<void>;
  logTripDeleted(tripId: string, tripName: string): Promise<void>;

  // Authentication events
  logLogin(method: string): Promise<void>;
  logSignUp(method: string): Promise<void>;

  // Error tracking
  logError(error: Error, additionalParams?: AnalyticsParams): Promise<void>;
}

const createAnalyticsService = (
  analytics = analyticsInstance
): AnalyticsService => {
  // Private functions in closure scope
  const validateEventName = (name: string) => {
    if (!name) throw new Error("Event name is required");
  };

  return {
    async logScreen(screenName: string, screenClass?: string) {
      await analytics.logScreenView({
        screen_name: screenName,
        screen_class: screenClass || screenName,
      });
    },

    async setUserProperties(properties: AnalyticsParams) {
      Object.entries(properties).forEach(([key, value]) => {
        analytics.setUserProperty(key, value?.toString());
      });
    },

    async logEvent(eventName: string, params?: AnalyticsParams) {
      validateEventName(eventName); // Private function usage
      await analytics.logEvent(eventName, params);
    },

    async logTripCreated(tripId: string, tripName: string) {
      await this.logEvent("trip_created", {
        trip_id: tripId,
        trip_name: tripName,
      });
    },

    async logTripUpdated(tripId: string, tripName: string) {
      await this.logEvent("trip_updated", {
        trip_id: tripId,
        trip_name: tripName,
      });
    },

    async logTripDeleted(tripId: string, tripName: string) {
      await this.logEvent("trip_deleted", {
        trip_id: tripId,
        trip_name: tripName,
      });
    },

    async logLogin(method: string) {
      await this.logEvent("login", { method });
    },

    async logSignUp(method: string) {
      await this.logEvent("sign_up", { method });
    },

    async logError(error: Error, additionalParams?: AnalyticsParams) {
      await this.logEvent("error", {
        error_name: error.name,
        error_message: error.message,
        ...additionalParams,
      });
    },
  };
};

export const analytics = createAnalyticsService();
