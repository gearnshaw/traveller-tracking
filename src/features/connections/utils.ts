import { Connection } from './types';

export type RawConnection = {
  name: string;
};

/**
 * Maps a raw traveller document from Firestore to a Traveller entity
 * @param id - The document ID from Firestore
 * @param data - The raw traveller data from Firestore
 * @returns A properly typed Traveller entity
 */
export const mapConnection = (id: string, data: RawConnection): Connection => {
  return {
    id,
    name: data.name
  };
};
