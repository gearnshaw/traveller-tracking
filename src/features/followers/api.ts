import { Follower } from './types';

// This would typically come from Firestore
const sampleFollowers: Follower[] = [
  { id: '1', name: 'Tom', status: 'active' },
  { id: '2', name: 'Dick', status: 'active' },
  { id: '3', name: 'Ted', status: 'pending' }
];

export const followersApi = {
  getFollowers: async (): Promise<Follower[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return sampleFollowers;
  }
};
