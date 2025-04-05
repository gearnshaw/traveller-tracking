import { Timestamp } from '@react-native-firebase/firestore';
import { mapLocation } from './utils';

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
    // Arrange
    const rawLocation = {
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: 'California',
      timezone: 'America/Los_Angeles',
      dtCreated: mockTimestamp
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
      dtCreated: mockTimestamp.toDate()
    });
  });

  it('should handle null region', () => {
    // Arrange
    const rawLocation = {
      city: 'San Francisco',
      isoCountryCode: 'US',
      region: null,
      timezone: 'America/Los_Angeles',
      dtCreated: mockTimestamp
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
      dtCreated: mockTimestamp.toDate()
    });
  });

  it('should handle empty strings', () => {
    // Arrange
    const rawLocation = {
      city: '',
      isoCountryCode: '',
      region: '',
      timezone: '',
      dtCreated: mockTimestamp
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
      dtCreated: mockTimestamp.toDate()
    });
  });
});
