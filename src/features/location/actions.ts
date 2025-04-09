import { locationService } from '@/services/location';
import { locationApi } from './api';
import { Location } from './types';

/**
 * Creates and saves a location from a position
 * Represents the business operation of converting a position into a stored location
 */
export const savePositionAsLocation = async (
  position: {
    latitude: number;
    longitude: number;
  },
  userId: string
): Promise<Location> => {
  const cityInfo = await locationService.getCityFromCoordinates(
    position.latitude,
    position.longitude
  );

  const location: Omit<Location, 'id'> = {
    dtCreated: new Date(),
    dtLastUpdated: new Date(),
    city: cityInfo?.city ?? 'Unknown City',
    region: cityInfo?.region ?? 'Unknown Region',
    isoCountryCode: cityInfo?.isoCountryCode ?? 'Unknown',
    timezone: cityInfo?.timezone ?? 'Unknown'
  };

  return locationApi.saveLocation(userId, location);
};
