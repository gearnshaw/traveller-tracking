import { auth } from '@/services/firebase';

export const useHomeScreen = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    handleLogout
  };
};
