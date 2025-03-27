import { Traveller } from './types';

export class TravellerBuilder {
  private id = 'someId';
  private name = 'John Doe';

  withId(id: string): TravellerBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): TravellerBuilder {
    this.name = name;
    return this;
  }

  build(): Traveller {
    return {
      id: this.id,
      name: this.name
    };
  }
}
