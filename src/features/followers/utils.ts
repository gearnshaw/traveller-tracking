import { Follower, FollowerStatus } from './types';

export type RawFollower = {
  name: string;
  status: FollowerStatus;
};

// Get all possible values from the FollowerStatus type
const validStatuses = Object.values(FollowerStatus);

const isValidStatus = (status: string): status is FollowerStatus => {
  return validStatuses.includes(status as FollowerStatus);
};

/**
 * Maps a raw follower document from Firestore to a Follower entity
 * @param id - The document ID from Firestore
 * @param data - The raw follower data from Firestore
 * @returns A properly typed Follower entity
 */
export const mapFollower = (id: string, data: RawFollower): Follower => {
  return {
    id,
    name: data.name,
    status: isValidStatus(data.status) ? data.status : FollowerStatus.Pending
  };
};
