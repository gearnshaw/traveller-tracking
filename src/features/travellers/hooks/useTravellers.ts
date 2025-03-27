import { useState, useEffect } from 'react';
import { Traveller } from '../types';
import { travellersApi } from '../api';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

export const useTravellers = () => {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const userId = useCurrentUser()?.userUid;

  useEffect(() => {
    if (!userId) {
      setTravellers([]);
      setIsLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const setupObserver = async () => {
      try {
        unsubscribe = await travellersApi.observeTravellers(userId, (travellers) => {
          setTravellers(travellers);
          setIsLoading(false);
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to observe travellers'));
        setIsLoading(false);
      }
    };

    setupObserver();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  return { travellers, isLoading, error };
};
