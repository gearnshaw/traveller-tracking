import { locationApi } from './api';
import { savePositionAsLocation } from './actions';
import { Location } from './types';
import { locationService } from '@/services/location';

// Mock the locationApi and locationService
jest.mock('./api', () => ({
  locationApi: {
    saveLocation: jest.fn()
  }
}));

jest.mock('@/services/location', () => ({
  locationService: {
    getCityFromCoordinates: jest.fn()
  }
}));

describe('savePositionAsLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const userId = 'test-user-id';
  const mockId = 'test-id';

  it('should create a location with city information', async () => {
    // Arrange
    const position = {
      latitude: 51.5074,
      longitude: -0.1278
    };
    const cityInfo = {
      city: 'London',
      region: 'England',
      isoCountryCode: 'GB',
      timezone: 'Europe/London'
    };
    const expectedLocation: Omit<Location, 'id'> = {
      ...cityInfo,
      dtCreated: expect.any(Date)
    };
    const mockSavedLocation = { id: mockId, ...expectedLocation };

    (locationService.getCityFromCoordinates as jest.Mock).mockResolvedValue(cityInfo);
    (locationApi.saveLocation as jest.Mock).mockResolvedValue(mockSavedLocation);

    // Act
    const result = await savePositionAsLocation(position, userId);

    // Assert
    expect(locationService.getCityFromCoordinates).toHaveBeenCalledWith(
      position.latitude,
      position.longitude
    );
    expect(locationApi.saveLocation).toHaveBeenCalledWith(
      userId,
      expect.objectContaining({
        city: cityInfo.city,
        region: cityInfo.region,
        isoCountryCode: cityInfo.isoCountryCode,
        timezone: cityInfo.timezone,
        dtCreated: expect.any(Date)
      })
    );
    expect(result).toEqual(mockSavedLocation);
  });

  it('should handle missing city information', async () => {
    // Arrange
    const position = {
      latitude: 12.3456789,
      longitude: 98.7654321
    };
    const expectedLocation: Omit<Location, 'id'> = {
      city: 'Unknown City',
      region: 'Unknown Region',
      isoCountryCode: 'Unknown',
      timezone: 'Unknown',
      dtCreated: expect.any(Date)
    };
    const mockSavedLocation = { id: mockId, ...expectedLocation };

    (locationService.getCityFromCoordinates as jest.Mock).mockResolvedValue(null);
    (locationApi.saveLocation as jest.Mock).mockResolvedValue(mockSavedLocation);

    // Act
    const result = await savePositionAsLocation(position, userId);

    // Assert
    expect(locationService.getCityFromCoordinates).toHaveBeenCalledWith(
      position.latitude,
      position.longitude
    );
    expect(locationApi.saveLocation).toHaveBeenCalledWith(
      userId,
      expect.objectContaining({
        city: 'Unknown City',
        region: 'Unknown Region',
        isoCountryCode: 'Unknown',
        timezone: 'Unknown',
        dtCreated: expect.any(Date)
      })
    );
    expect(result).toEqual(mockSavedLocation);
  });
});
