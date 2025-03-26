export type FollowerStatus = 'active' | 'pending';

export type Follower = {
  id: string;
  name: string;
  status: FollowerStatus;
};
