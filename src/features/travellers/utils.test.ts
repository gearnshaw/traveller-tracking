import { mapTraveller } from './utils';
import { TravellerBuilder } from './builders';

describe(mapTraveller.name, () => {
  it('should correctly map a raw traveller to a Traveller entity', () => {
    // Arrange
    const rawTraveller = {
      name: 'John Doe',
      userId: '123'
    };
    const id = '123';

    const expected = new TravellerBuilder()
      .withId(id)
      .withName(rawTraveller.name)
      .withUserId(rawTraveller.userId)
      .build();

    // Act
    const result = mapTraveller(id, rawTraveller);

    // Assert
    expect(result).toEqual(expected);
  });
});
