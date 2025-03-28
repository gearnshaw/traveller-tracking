import { mapTraveller } from './utils';
import { TravellerBuilder } from './builders';

describe(mapTraveller.name, () => {
  it('should correctly map a raw traveller to a Traveller entity', () => {
    // Arrange
    const rawTraveller = {
      name: 'John Doe'
    };
    const id = '123';

    const expected = new TravellerBuilder().withId(id).withName(rawTraveller.name).build();

    // Act
    const result = mapTraveller(id, rawTraveller);

    // Assert
    expect(result).toEqual(expected);
  });
});
