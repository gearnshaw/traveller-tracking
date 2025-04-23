import { auth } from '@/services/firebase';
import { unregisterBackgroundLocationTask } from '@/features/location/tasks/backgroundLocationTask';
import { homeLogger } from '../logger';

export const useHomeScreen = () => {
  const handleLogout = async () => {
    try {
      // Stop background location tracking before signing out
      await unregisterBackgroundLocationTask();
      await auth.signOut();
    } catch (error) {
      homeLogger.error('Error signing out:', error);
    }
  };

  return {
    handleLogout
  };
};
