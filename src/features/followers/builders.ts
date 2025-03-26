import { Follower, FollowerStatus } from './types';

export class FollowerBuilder {
  private id = 'someId';
  private name = 'Teddy Taylor';
  private status: FollowerStatus = 'active';

  withId(id: string): FollowerBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): FollowerBuilder {
    this.name = name;
    return this;
  }

  withStatus(status: FollowerStatus): FollowerBuilder {
    this.status = status;
    return this;
  }

  build(): Follower {
    return {
      id: this.id,
      name: this.name,
      status: this.status
    };
  }
}
