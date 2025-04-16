import { Traveller } from './types';

export type RawTraveller = {
  name: string;
  userId: string;
};

/**
 * Maps a raw traveller document from Firestore to a Traveller entity
 * @param id - The document ID from Firestore
 * @param data - The raw traveller data from Firestore
 * @returns A properly typed Traveller entity
 */
export const mapTraveller = (id: string, data: RawTraveller): Traveller => {
  return {
    id,
    name: data.name,
    userId: data.userId
  };
};
