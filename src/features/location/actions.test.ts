import { locationApi } from './api';
import { savePositionAsLocation } from './actions';
import { Location } from './types';

// Mock the locationApi
jest.mock('./api', () => ({
  locationApi: {
    saveLocation: jest.fn()
  }
}));

describe('savePositionAsLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const userId = 'test-user-id';
  const mockId = 'test-id';

  it('should create a location with formatted coordinates as description', async () => {
    // Arrange
    const position = {
      latitude: 51.5074,
      longitude: -0.1278
    };
    const expectedLocation: Omit<Location, 'id'> = {
      description: '51.507, -0.128',
      dtCreated: expect.any(Date)
    };
    const mockSavedLocation = { id: mockId, ...expectedLocation };

    (locationApi.saveLocation as jest.Mock).mockResolvedValue(mockSavedLocation);

    // Act
    const result = await savePositionAsLocation(position, userId);

    // Assert
    expect(locationApi.saveLocation).toHaveBeenCalledWith(
      userId,
      expect.objectContaining({
        description: expectedLocation.description,
        dtCreated: expect.any(Date)
      })
    );
    expect(result).toEqual(mockSavedLocation);
  });

  it('should handle different coordinate precision correctly', async () => {
    // Arrange
    const position = {
      latitude: 12.3456789,
      longitude: 98.7654321
    };
    const expectedLocation: Omit<Location, 'id'> = {
      description: '12.346, 98.765',
      dtCreated: expect.any(Date)
    };
    const mockSavedLocation = { id: mockId, ...expectedLocation };

    (locationApi.saveLocation as jest.Mock).mockResolvedValue(mockSavedLocation);

    // Act
    const result = await savePositionAsLocation(position, userId);

    // Assert
    expect(locationApi.saveLocation).toHaveBeenCalledWith(
      userId,
      expect.objectContaining({
        description: expectedLocation.description,
        dtCreated: expect.any(Date)
      })
    );
    expect(result).toEqual(mockSavedLocation);
  });
});
