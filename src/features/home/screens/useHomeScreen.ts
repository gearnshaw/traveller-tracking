import { Follower } from '@/features/followers/types';
import { auth } from '@/services/firebase';

// This would typically come from an API or store
const sampleFollowers: Follower[] = [
  { id: '1', name: 'Mum', status: 'active' },
  { id: '2', name: 'Dad', status: 'active' },
  { id: '3', name: 'Sarah', status: 'pending' }
];

export const useHomeScreen = () => {
  const handleManagePress = () => {
    // Will implement later
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    followers: sampleFollowers,
    handleManagePress,
    handleLogout
  };
};
