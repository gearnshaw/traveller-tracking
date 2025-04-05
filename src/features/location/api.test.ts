import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
} from '@react-native-firebase/firestore';
import { locationApi } from './api';
import { db } from '@/services/firebase';
import { Location } from './types';

// Mock Firebase modules
jest.mock('@react-native-firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  Timestamp: {
    fromDate: jest.fn().mockImplementation((date) => ({
      toDate: () => date,
      toMillis: () => date.getTime(),
      seconds: Math.floor(date.getTime() / 1000),
      nanoseconds: (date.getTime() % 1000) * 1000000
    }))
  }
}));

jest.mock('@/services/firebase', () => ({
  db: {}
}));

describe('locationApi', () => {
  const mockUserId = 'test-user-123';
  const mockDate = new Date('2024-01-01T00:00:00.000Z');
  const mockLocation: Omit<Location, 'id'> = {
    city: 'San Francisco',
    isoCountryCode: 'US',
    region: 'California',
    timezone: 'America/Los_Angeles',
    dtCreated: mockDate
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveLocation', () => {
    it('should save location and return with generated id', async () => {
      const mockDocId = 'test-doc-123';
      (collection as jest.Mock).mockReturnValue('locations-collection-ref');
      (addDoc as jest.Mock).mockResolvedValue({ id: mockDocId });

      const result = await locationApi.saveLocation(mockUserId, mockLocation);

      // Verify collection path is correct
      expect(collection).toHaveBeenCalledWith(db, `users/${mockUserId}/locations`);

      // Verify document is saved with correct data
      expect(addDoc).toHaveBeenCalledWith('locations-collection-ref', mockLocation);

      // Verify returned data structure
      expect(result).toEqual({
        id: mockDocId,
        ...mockLocation
      });
    });

    it('should throw error when Firestore operation fails', async () => {
      const mockError = new Error('Firestore error');
      (collection as jest.Mock).mockReturnValue('locations-collection-ref');
      (addDoc as jest.Mock).mockRejectedValue(mockError);

      await expect(locationApi.saveLocation(mockUserId, mockLocation)).rejects.toThrow(
        'Firestore error'
      );
    });
  });

  describe('observeLatestLocation', () => {
    const mockUnsubscribe = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      (query as jest.Mock).mockReturnValue('query-ref');
      (orderBy as jest.Mock).mockReturnValue('order-ref');
      (limit as jest.Mock).mockReturnValue('limit-ref');
      (onSnapshot as jest.Mock).mockImplementation((query, callback) => {
        // Store the callback for later use in tests
        (onSnapshot as any).mockCallback = callback;
        return mockUnsubscribe;
      });
    });

    it('should set up correct query and return unsubscribe function', () => {
      const onLocationUpdate = jest.fn();

      const unsubscribe = locationApi.observeLatestLocation(mockUserId, onLocationUpdate);

      // Verify query setup
      expect(collection).toHaveBeenCalledWith(db, `users/${mockUserId}/locations`);
      expect(orderBy).toHaveBeenCalledWith('dtCreated', 'desc');
      expect(limit).toHaveBeenCalledWith(1);
      expect(query).toHaveBeenCalled();
      expect(onSnapshot).toHaveBeenCalled();

      // Verify unsubscribe is returned
      expect(unsubscribe).toBe(mockUnsubscribe);
    });

    it('should handle empty snapshot', () => {
      const onLocationUpdate = jest.fn();
      locationApi.observeLatestLocation(mockUserId, onLocationUpdate);

      // Simulate empty snapshot
      const mockSnapshot = { empty: true, docs: [] };
      (onSnapshot as any).mockCallback(mockSnapshot);

      expect(onLocationUpdate).toHaveBeenCalledWith(null);
    });

    it('should handle snapshot with location data', () => {
      const onLocationUpdate = jest.fn();
      const mockLocationData = {
        city: 'San Francisco',
        isoCountryCode: 'US',
        region: 'California',
        timezone: 'America/Los_Angeles',
        dtCreated: {
          toDate: () => mockDate,
          toMillis: () => mockDate.getTime(),
          seconds: Math.floor(mockDate.getTime() / 1000),
          nanoseconds: (mockDate.getTime() % 1000) * 1000000
        }
      };

      locationApi.observeLatestLocation(mockUserId, onLocationUpdate);

      // Simulate snapshot with data
      const mockSnapshot = {
        empty: false,
        docs: [
          {
            id: 'test-doc-123',
            data: () => mockLocationData
          }
        ]
      };
      (onSnapshot as any).mockCallback(mockSnapshot);

      expect(onLocationUpdate).toHaveBeenCalledWith({
        id: 'test-doc-123',
        city: 'San Francisco',
        isoCountryCode: 'US',
        region: 'California',
        timezone: 'America/Los_Angeles',
        dtCreated: mockDate
      });
    });

    it('should properly clean up subscription on unsubscribe', () => {
      const onLocationUpdate = jest.fn();
      const unsubscribe = locationApi.observeLatestLocation(mockUserId, onLocationUpdate);

      unsubscribe();

      expect(mockUnsubscribe).toHaveBeenCalled();
    });
  });
});
