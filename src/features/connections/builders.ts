import { Connection } from './types';

export class ConnectionBuilder {
  private id = 'someId';
  private name = 'John Doe';

  withId(id: string): ConnectionBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): ConnectionBuilder {
    this.name = name;
    return this;
  }

  build(): Connection {
    return {
      id: this.id,
      name: this.name
    };
  }
}
