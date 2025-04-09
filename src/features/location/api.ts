import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
} from '@react-native-firebase/firestore';
import { db } from '@/services/firebase';
import { Location } from './types';
import { mapLocation, RawLocation } from './utils';
const getLocationsPath = (userId: string) => `users/${userId}/locations`;

export const locationApi = {
  saveLocation: async (userId: string, location: Omit<Location, 'id'>): Promise<Location> => {
    const locationsRef = collection(db, getLocationsPath(userId));
    const docRef = await addDoc(locationsRef, location);

    return {
      id: docRef.id,
      ...location
    };
  },

  observeLatestLocation: (
    userId: string,
    onLocationUpdate: (location: Location | null) => void
  ) => {
    const locationsRef = collection(db, getLocationsPath(userId));
    const latestLocationQuery = query(locationsRef, orderBy('dtLastUpdated', 'desc'), limit(1));

    return onSnapshot(latestLocationQuery, (snapshot) => {
      if (snapshot.empty) {
        onLocationUpdate(null);
        return;
      }

      const doc = snapshot.docs[0];
      onLocationUpdate(mapLocation(doc.id, doc.data() as RawLocation));
    });
  }
};
