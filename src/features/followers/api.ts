import { Follower } from './types';
import { db } from '@/services/firebase';
import { mapFollower, RawFollower } from './utils';

const getFollowersPath = (userId: string) => `users/${userId}/followers`;

export const followersApi = {
  observeFollowers: async (
    userId: string,
    callback: (followers: Follower[]) => void
  ): Promise<() => void> => {
    const unsubscribe = db.collection(getFollowersPath(userId)).onSnapshot(
      (snapshot) => {
        const followers = snapshot.docs.map((doc) =>
          mapFollower(doc.id, doc.data() as RawFollower)
        );
        callback(followers);
      },
      (error) => {
        console.error('Error observing followers:', error);
        callback([]);
      }
    );
    return unsubscribe;
  }
};
