import { useFocusEffect } from 'expo-router';
import { logScreenSync } from '@/services/analytics';
import { useCallback } from 'react';

export const useScreenAnalytics = (screenName: string, screenClass?: string) => {
  useFocusEffect(
    useCallback(() => {
      logScreenSync(screenName, screenClass);
    }, [screenName, screenClass])
  );
};
