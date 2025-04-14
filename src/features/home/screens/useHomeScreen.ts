import { auth } from '@/services/firebase';
import { unregisterBackgroundLocationTask } from '@/features/location/tasks/backgroundLocationTask';

export const useHomeScreen = () => {
  const handleLogout = async () => {
    try {
      // Stop background location tracking before signing out
      await unregisterBackgroundLocationTask();
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    handleLogout
  };
};
