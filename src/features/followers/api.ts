import { Follower } from './types';
import { db } from '@/services/firebase';
import { mapFollower, RawFollower } from './utils';

// This would typically come from Firestore
const sampleFollowers: Follower[] = [
  { id: '1', name: 'Tom', status: 'active' },
  { id: '2', name: 'Dick', status: 'active' },
  { id: '3', name: 'Ted', status: 'pending' }
];

export const followersApi = {
  getFollowersTest: async (): Promise<Follower[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return sampleFollowers;
  },

  observeFollowers: async (
    userId: string,
    callback: (followers: Follower[]) => void
  ): Promise<() => void> => {
    const unsubscribe = db.collection(`users/${userId}/followers`).onSnapshot(
      (snapshot) => {
        const followers = snapshot.docs.map((doc) =>
          mapFollower(doc.id, doc.data() as RawFollower)
        );
        callback(followers);
      },
      (error) => {
        console.error(error);
        callback([]);
      }
    );
    return unsubscribe;
  }
};
