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
  timestamp: number,
  userId: string
): Promise<Location> => {
  const { latitude, longitude } = position;

  const cityInfo = await locationService.getCityFromCoordinates(latitude, longitude);

  const existingLocation = await locationApi.getLatestLocation(userId);

  if (existingLocation) {
    if (existingLocation.city === cityInfo?.city) {
      return updateLocation(userId, existingLocation, timestamp);
    } else {
      return saveLocation(userId, cityInfo, timestamp);
    }
  } else {
    return saveLocation(userId, cityInfo, timestamp);
  }
};

const saveLocation = async (
  userId: string,
  cityInfo: ReverseGeocodeCity | null,
  timestamp: number
) => {
  const now = new Date();
  const location: Omit<Location, 'id'> = {
    dtCreated: now,
    dtLastUpdated: now,
    dtLocationCollected: new Date(timestamp),
    city: cityInfo?.city ?? 'Unknown City',
    region: cityInfo?.region ?? 'Unknown Region',
    isoCountryCode: cityInfo?.isoCountryCode ?? 'Unknown',
    timezone: cityInfo?.timezone ?? 'Unknown'
  };

  return locationApi.saveLocation(userId, location);
};

const updateLocation = async (userId: string, location: Location, timestamp: number) => {
  const now = new Date();
  const updatedLocation = {
    ...location,
    dtLastUpdated: now,
    dtLocationCollected: new Date(timestamp)
  };
  return locationApi.updateLocation(userId, updatedLocation);
};
