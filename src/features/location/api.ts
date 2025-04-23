import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs
} from '@react-native-firebase/firestore';
import { db } from '@/services/firebase';
import { Location } from './types';
import { mapLocation, RawLocation } from './utils';
import { locationLogger } from './logger';

const getLocationsPath = (userId: string) => `users/${userId}/locations`;

const getLatestLocationQuery = (userId: string) => {
  const locationsRef = collection(db, getLocationsPath(userId));
  return query(locationsRef, orderBy('dtLastUpdated', 'desc'), limit(1));
};

export const locationApi = {
  saveLocation: async (userId: string, location: Omit<Location, 'id'>): Promise<Location> => {
    const locationsRef = collection(db, getLocationsPath(userId));
    const docRef = await addDoc(locationsRef, location);

    return {
      id: docRef.id,
      ...location
    };
  },

  updateLocation: async (userId: string, location: Location): Promise<Location> => {
    const locationPath = getLocationsPath(userId);
    try {
      const { id, ...locationWithoutId } = location;
      await db.collection(locationPath).doc(id).update(locationWithoutId);
      return location;
    } catch (error) {
      locationLogger.error('Error updating location:', error);
      throw error;
    }
  },

  observeLatestLocation: (
    userId: string,
    onLocationUpdate: (location: Location | null) => void
  ) => {
    const latestLocationQuery = getLatestLocationQuery(userId);

    return onSnapshot(latestLocationQuery, (snapshot) => {
      if (!snapshot || snapshot.empty) {
        onLocationUpdate(null);
        return;
      }

      const doc = snapshot.docs[0];
      onLocationUpdate(mapLocation(doc.id, doc.data() as RawLocation));
    });
  },

  getLatestLocation: async (userId: string): Promise<Location | null> => {
    const latestLocationQuery = getLatestLocationQuery(userId);
    const snapshot = await getDocs(latestLocationQuery);

    if (snapshot.empty) {
      return null;
    }

    const firstDoc = snapshot.docs[0];
    return mapLocation(firstDoc.id, firstDoc.data() as RawLocation);
  }
};
