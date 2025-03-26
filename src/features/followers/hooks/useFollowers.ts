import { useState, useEffect } from 'react';
import { Follower } from '../types';
import { followersApi } from '../api';

export const useFollowers = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFollowers = async () => {
      try {
        const data = await followersApi.getFollowers();
        setFollowers(data);
      } catch (error) {
        console.error('Error loading followers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFollowers();
  }, []);

  return {
    followers,
    isLoading
  };
};
