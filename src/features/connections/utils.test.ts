import { mapConnection } from './utils';
import { ConnectionBuilder } from './builders';

describe(mapConnection.name, () => {
  it('should correctly map a raw traveller to a Traveller entity', () => {
    // Arrange
    const rawConnection = {
      name: 'John Doe'
    };
    const id = '123';

    const expected = new ConnectionBuilder().withId(id).withName(rawConnection.name).build();

    // Act
    const result = mapConnection(id, rawConnection);

    // Assert
    expect(result).toEqual(expected);
  });
});
