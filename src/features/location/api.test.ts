import { addDoc, collection } from '@react-native-firebase/firestore';
import { locationApi } from './api';
import { db } from '@/services/firebase';
import { Location } from './types';

// Mock Firebase modules
jest.mock('@react-native-firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn()
}));

jest.mock('@/services/firebase', () => ({
  db: {}
}));

describe('locationApi', () => {
  const mockUserId = 'test-user-123';
  const mockLocation: Omit<Location, 'id'> = {
    description: '37.7749, -122.4194',
    dtLastUpdated: new Date('2024-01-01T00:00:00.000Z')
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
});
