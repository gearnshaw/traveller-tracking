export enum FollowerStatus {
  Active = 'active',
  Pending = 'pending'
}

export type Follower = {
  id: string;
  name: string;
  status: FollowerStatus;
};
