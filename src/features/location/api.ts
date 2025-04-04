import { addDoc, collection } from '@react-native-firebase/firestore';
import { db } from '@/services/firebase';
import { Location } from './types';

const getLocationsPath = (userId: string) => `users/${userId}/locations`;

export const locationApi = {
  saveLocation: async (userId: string, location: Omit<Location, 'id'>): Promise<Location> => {
    const locationsRef = collection(db, getLocationsPath(userId));
    const docRef = await addDoc(locationsRef, {
      ...location,
      dtLastUpdated: new Date()
    });

    return {
      id: docRef.id,
      ...location
    };
  }
};
