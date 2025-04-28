import { useState } from 'react';
import {
  registerBackgroundLocationTask,
  unregisterBackgroundLocationTask
} from '../tasks/backgroundLocationTask';
import { locationService } from '@/services/location';
import { useAppState } from '@/shared/hooks/useAppState';
import { locationLogger } from '../logger';

type BackgroundLocationState = {
  isTracking: boolean;
  error: Error | null;
};

/**
 * Hook to manage background location tracking
 * @returns Object containing tracking state and control functions
 */
export const useBackgroundLocation = () => {
  const [state, setState] = useState<BackgroundLocationState>({
    isTracking: false,
    error: null
  });

  // Check if tracking is active when app comes to foreground
  useAppState(async (appState) => {
    if (appState === 'active') {
      try {
        const hasPermissions = await locationService.checkPermissions();
        if (hasPermissions) {
          const isTracking = await locationService.isBackgroundTrackingActive();
          setState((prev) => ({ ...prev, isTracking }));
        }
      } catch (error) {
        setState((prev) => ({ ...prev, error: error as Error }));
      }
    }
  });

  /**
   * Start background location tracking
   */
  const startTracking = async () => {
    try {
      // Request permissions if needed
      const hasPermissions = await locationService.requestPermissions();
      if (!hasPermissions) {
        throw new Error('Location permissions not granted');
      }

      // Register the background task
      locationLogger.debug('Registering background location task');
      const success = await registerBackgroundLocationTask();
      if (!success) {
        throw new Error('Failed to register background location task');
      }

      setState({ isTracking: true, error: null });
      locationLogger.debug('Background location task successfully registered');
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      locationLogger.error('Failed to start tracking', error);
    }
  };

  /**
   * Stop background location tracking
   */
  const stopTracking = async () => {
    try {
      const success = await unregisterBackgroundLocationTask();
      if (!success) {
        throw new Error('Failed to unregister background location task');
      }

      setState({ isTracking: false, error: null });
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
    }
  };

  return {
    isTracking: state.isTracking,
    error: state.error,
    startTracking,
    stopTracking
  };
};
