export enum FollowerStatus {
  Active = 'active',
  Pending = 'pending',
  Unknown = 'unknown'
}

export type Follower = {
  id: string;
  name: string;
  status: FollowerStatus;
};
