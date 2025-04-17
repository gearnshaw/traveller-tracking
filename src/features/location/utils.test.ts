import { Timestamp } from '@react-native-firebase/firestore';
import { mapLocation, RawLocation } from './utils';

// Mock Firebase Timestamp
jest.mock('@react-native-firebase/firestore', () => ({
  Timestamp: jest.fn().mockImplementation((seconds, nanoseconds) => ({
    seconds,
    nanoseconds,
    toDate: jest.fn().mockReturnValue(new Date(seconds * 1000))
  }))
}));

describe('mapLocation', () => {
  const mockId = 'test-location-123';
  const mockDate = new Date('2024-01-01T00:00:00.000Z');
  const mockTimestamp = new Timestamp(mockDate.getTime() / 1000, 0);

  it('should map raw location data to Location entity', () => {
    const dtCreated = new Date('2024-01-01T00:00:00.000Z');
    const dtLastUpdated = new Date('2024-01-02T00:00:00.000Z');
    const dtLocationCollected = new Date('2024-01-01T09:00:00.000Z');

    // Arrange
    const rawLocation: RawLocation = {
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: 'California',
      timezone: 'America/Los_Angeles',
      dtCreated: new Timestamp(dtCreated.getTime() / 1000, 0),
      dtLastUpdated: new Timestamp(dtLastUpdated.getTime() / 1000, 0),
      dtLocationCollected: new Timestamp(dtLocationCollected.getTime() / 1000, 0)
    };

    // Act
    const result = mapLocation(mockId, rawLocation);

    // Assert
    expect(result).toEqual({
      id: mockId,
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: 'California',
      timezone: 'America/Los_Angeles',
      dtCreated: dtCreated,
      dtLastUpdated: dtLastUpdated,
      dtLocationCollected: dtLocationCollected
    });
  });

  it('should handle null region', () => {
    // Arrange
    const rawLocation: RawLocation = {
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: null,
      timezone: 'America/Los_Angeles',
      dtCreated: mockTimestamp,
      dtLastUpdated: mockTimestamp,
      dtLocationCollected: mockTimestamp
    };

    // Act
    const result = mapLocation(mockId, rawLocation);

    // Assert
    expect(result).toEqual({
      id: mockId,
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: null,
      timezone: 'America/Los_Angeles',
      dtCreated: mockTimestamp.toDate(),
      dtLastUpdated: mockTimestamp.toDate(),
      dtLocationCollected: mockTimestamp.toDate()
    });
  });

  it('should handle empty strings', () => {
    // Arrange
    const rawLocation: RawLocation = {
      city: '',
      isoCountryCode: '',
      region: '',
      timezone: '',
      dtCreated: mockTimestamp,
      dtLastUpdated: mockTimestamp,
      dtLocationCollected: mockTimestamp
    };

    // Act
    const result = mapLocation(mockId, rawLocation);

    // Assert
    expect(result).toEqual({
      id: mockId,
      city: '',
      isoCountryCode: '',
      region: '',
      timezone: '',
      dtCreated: mockTimestamp.toDate(),
      dtLastUpdated: mockTimestamp.toDate(),
      dtLocationCollected: mockTimestamp.toDate()
    });
  });

  it('should handle undefined dtLocationCollected', () => {
    const dtCreated = new Date('2024-01-01T00:00:00.000Z');
    const dtLastUpdated = new Date('2024-01-02T00:00:00.000Z');

    // Arrange
    const rawLocation: RawLocation = {
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: 'California',
      timezone: 'America/Los_Angeles',
      dtCreated: new Timestamp(dtCreated.getTime() / 1000, 0),
      dtLastUpdated: new Timestamp(dtLastUpdated.getTime() / 1000, 0)
    };

    // Act
    const result = mapLocation(mockId, rawLocation);

    // Assert
    expect(result).toEqual({
      id: mockId,
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: 'California',
      timezone: 'America/Los_Angeles',
      dtCreated: dtCreated,
      dtLastUpdated: dtLastUpdated,
      dtLocationCollected: dtLastUpdated
    });
  });
});
