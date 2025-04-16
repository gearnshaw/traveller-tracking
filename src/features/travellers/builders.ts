import { Traveller } from './types';

export class TravellerBuilder {
  private id = 'someId';
  private name = 'John Doe';
  private userId = 'someUserId';
  withId(id: string): TravellerBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): TravellerBuilder {
    this.name = name;
    return this;
  }

  withUserId(userId: string): TravellerBuilder {
    this.userId = userId;
    return this;
  }

  build(): Traveller {
    return {
      id: this.id,
      name: this.name,
      userId: this.userId
    };
  }
}
