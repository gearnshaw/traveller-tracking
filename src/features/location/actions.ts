import { locationService } from '@/services/location';
import { Location, ReverseGeocodeCity } from './types';
import { locationApi } from './api';
/**
 * Creates and saves a location from a position
 * Represents the business operation of converting a position into a stored location
 */
export const saveOrUpdateLocation = async (
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

  const existingLocation = await locationApi.getLatestLocation(userId);

  if (existingLocation) {
    if (existingLocation.city === cityInfo?.city) {
      return updateLocation(userId, existingLocation);
    } else {
      return saveLocation(userId, cityInfo);
    }
  } else {
    return saveLocation(userId, cityInfo);
  }
};

const saveLocation = async (userId: string, cityInfo: ReverseGeocodeCity | null) => {
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

const updateLocation = async (userId: string, location: Location) => {
  const updatedLocation = {
    ...location,
    dtLastUpdated: new Date()
  };
  return locationApi.updateLocation(userId, updatedLocation);
};
