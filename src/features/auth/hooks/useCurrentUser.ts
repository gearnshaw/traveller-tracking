import { useAuth } from './useAuth';
import { User } from '../types';

export const useCurrentUser = (): User | null => {
  const { user } = useAuth();

  if (!user) return null;

  return {
    userUid: user.uid
  };
};
