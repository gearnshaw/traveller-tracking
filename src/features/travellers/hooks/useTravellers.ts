import { useState, useEffect } from 'react';
import { Traveller } from '../types';
import { travellersApi } from '../api';

export const useTravellers = () => {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTravellers = async () => {
      try {
        const data = await travellersApi.getTravellers();
        setTravellers(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch travellers'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravellers();
  }, []);

  return { travellers, isLoading, error };
};
