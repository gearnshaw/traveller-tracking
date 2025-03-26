import { mapFollower } from './utils';
import { FollowerStatus } from './types';
import { FollowerBuilder } from './builders';

describe(mapFollower.name, () => {
  it('should correctly map a raw follower to a Follower entity', () => {
    // Arrange
    const rawFollower = {
      name: 'John Doe',
      status: 'active' as FollowerStatus
    };
    const id = '123';

    const expected = new FollowerBuilder()
      .withId(id)
      .withName(rawFollower.name)
      .withStatus(rawFollower.status)
      .build();

    // Act
    const result = mapFollower(id, rawFollower);

    expect(result).toEqual(expected);
  });

  it('should handle pending status', () => {
    // Arrange
    const rawFollower = {
      name: 'Jane Doe',
      status: 'pending' as FollowerStatus
    };
    const id = '456';

    const expected = new FollowerBuilder()
      .withId(id)
      .withName(rawFollower.name)
      .withStatus(rawFollower.status)
      .build();

    // Act
    const result = mapFollower(id, rawFollower);

    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle incorrect status', () => {
    // Arrange
    const rawFollower = {
      name: 'John Doe',
      status: 'incorrectStatus' as FollowerStatus
    };
    const id = '789';

    const expectedStatus = FollowerStatus.Pending;

    // Act
    const result = mapFollower(id, rawFollower);

    // Assert
    expect(result.status).toEqual(expectedStatus);
  });
});
