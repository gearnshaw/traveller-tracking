import { useFocusEffect } from 'expo-router';
import { logScreen } from '@/services/analytics';
import { useCallback } from 'react';

export const useScreenAnalytics = (screenName: string, screenClass?: string) => {
  useFocusEffect(
    useCallback(() => {
      logScreen(screenName, screenClass);
    }, [screenName, screenClass])
  );
};
