import { useState, useEffect } from 'react';
import { Follower } from '../types';
import { followersApi } from '../api';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

export const useFollowers = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useCurrentUser()?.userUid;

  useEffect(() => {
    if (!userId) {
      setFollowers([]);
      setIsLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const loadFollowers = async () => {
      try {
        unsubscribe = await followersApi.observeFollowers(userId, (followers) => {
          setFollowers(followers);
        });
      } catch (error) {
        console.error('Error loading followers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFollowers();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  return {
    followers,
    isLoading
  };
};
