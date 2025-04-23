import { Traveller } from './types';
import { db } from '@/services/firebase';
import { mapTraveller, RawTraveller } from './utils';
import { travellersLogger } from './logger';

const getTravellersPath = (userId: string) => `users/${userId}/travellers`;

export const travellersApi = {
  observeTravellers: async (
    userId: string,
    callback: (travellers: Traveller[]) => void
  ): Promise<() => void> => {
    const unsubscribe = db.collection(getTravellersPath(userId)).onSnapshot(
      (snapshot) => {
        const travellers = snapshot.docs.map((doc) =>
          mapTraveller(doc.id, doc.data() as RawTraveller)
        );
        callback(travellers);
      },
      (error) => {
        travellersLogger.error('Error observing travellers:', error);
        callback([]);
      }
    );
    return unsubscribe;
  }
};
