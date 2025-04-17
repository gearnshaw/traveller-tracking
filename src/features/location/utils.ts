import { Location } from './types';
import { Timestamp } from '@react-native-firebase/firestore';

export type RawLocation = Omit<
  Location,
  'id' | 'dtCreated' | 'dtLastUpdated' | 'dtLocationCollected'
> & {
  dtCreated: Timestamp;
  dtLastUpdated: Timestamp;
  dtLocationCollected?: Timestamp;
};

/**
 * Maps a raw location document from Firestore to a Location entity
 * @param id - The document ID from Firestore
 * @param raw - The raw location data from Firestore
 * @returns A properly typed Location entity
 */
export const mapLocation = (id: string, raw: RawLocation): Location => ({
  id,
  ...raw,
  dtCreated: raw.dtCreated.toDate(),
  dtLastUpdated: raw.dtLastUpdated.toDate(),
  dtLocationCollected: raw.dtLocationCollected?.toDate() ?? raw.dtLastUpdated.toDate()
});
