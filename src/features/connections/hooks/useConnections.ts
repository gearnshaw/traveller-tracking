import { useState, useEffect } from 'react';
import { Connection } from '../types';
import { connectionsApi } from '../api';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

export const useConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const userId = useCurrentUser()?.userUid;

  useEffect(() => {
    if (!userId) {
      setConnections([]);
      setIsLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const setupObserver = async () => {
      try {
        unsubscribe = await connectionsApi.observeConnections(userId, (connections) => {
          setConnections(connections);
          setIsLoading(false);
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to observe connections'));
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

  return { connections, isLoading, error };
};
