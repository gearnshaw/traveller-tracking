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
  const location: Omit<Location, 'id'> = {
    description: `${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)}`,
    dtCreated: new Date()
  };

  return locationApi.saveLocation(userId, location);
};
