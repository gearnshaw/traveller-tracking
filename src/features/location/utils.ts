import { Location } from './types';
import { Timestamp } from '@react-native-firebase/firestore';

export type RawLocation = Omit<Location, 'id' | 'dtCreated' | 'dtLastUpdated'> & {
  dtCreated: Timestamp;
  dtLastUpdated: Timestamp;
};

/**
 * Maps a raw location document from Firestore to a Location entity
 * @param id - The document ID from Firestore
 * @param data - The raw location data from Firestore
 * @returns A properly typed Location entity
 */
export const mapLocation = (id: string, data: RawLocation): Location => {
  return {
    id,
    ...data,
    dtCreated: data.dtCreated.toDate(),
    dtLastUpdated: data.dtLastUpdated.toDate()
  };
};
