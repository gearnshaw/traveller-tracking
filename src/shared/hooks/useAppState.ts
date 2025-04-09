import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type AppStateChangeCallback = (state: AppStateStatus) => void;

/**
 * Hook to monitor app state changes (foreground/background)
 * @param onForeground - Optional callback when app enters foreground
 * @param onBackground - Optional callback when app enters background
 * @returns The current app state
 */
export const useAppState = (
  onForeground?: AppStateChangeCallback,
  onBackground?: AppStateChangeCallback
) => {
  const appState = useRef(AppState.currentState);
  const [currentState, setCurrentState] = useState<AppStateStatus>(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to foreground
        onForeground?.(nextAppState);
      } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        // App has gone to background
        onBackground?.(nextAppState);
      }

      appState.current = nextAppState;
      setCurrentState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [onForeground, onBackground]);

  return currentState;
};
