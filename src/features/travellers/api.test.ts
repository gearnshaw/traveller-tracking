import { travellersApi } from './api';
import { db } from '@/services/firebase';
import { TravellerBuilder } from './builders';

// Mock Firebase
jest.mock('@/services/firebase', () => ({
  db: {
    collection: jest.fn()
  }
}));

describe('travellersApi', () => {
  const mockUserId = 'test-user-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockSnapshot = (docs: { id: string; data: () => any }[]) => ({
    docs
  });

  const createMockCollection = (onSnapshot: jest.Mock) => {
    const mockCollection = jest.fn().mockReturnValue({
      onSnapshot
    });
    (db.collection as jest.Mock).mockImplementation(mockCollection);
    return mockCollection;
  };

  describe(travellersApi.observeTravellers.name, () => {
    it('should set up a snapshot listener and return unsubscribe function', async () => {
      // Arrange
      const mockUnsubscribe = jest.fn();
      const mockOnSnapshot = jest.fn().mockReturnValue(mockUnsubscribe);
      createMockCollection(mockOnSnapshot);

      // Act
      const unsubscribe = await travellersApi.observeTravellers(mockUserId, jest.fn());

      // Assert
      expect(db.collection).toHaveBeenCalledWith(`users/${mockUserId}/travellers`);
      expect(mockOnSnapshot).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
      expect(unsubscribe).toBe(mockUnsubscribe);
    });

    it('should map and return travellers when snapshot is received', async () => {
      // Arrange
      const mockSnapshot = createMockSnapshot([
        { id: '1', data: () => ({ name: 'John' }) },
        { id: '2', data: () => ({ name: 'Jane' }) }
      ]);

      const expectedTravellers = [
        new TravellerBuilder().withId('1').withName('John').build(),
        new TravellerBuilder().withId('2').withName('Jane').build()
      ];

      const mockOnSnapshot = jest.fn().mockImplementation((successCallback) => {
        successCallback(mockSnapshot);
      });
      createMockCollection(mockOnSnapshot);
      const callback = jest.fn();

      // Act
      await travellersApi.observeTravellers(mockUserId, callback);

      // Assert
      expect(callback).toHaveBeenCalledWith(expectedTravellers);
    });

    it('should return empty array and log error when snapshot fails', async () => {
      // Arrange
      const mockError = new Error('Firestore error');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const mockOnSnapshot = jest.fn().mockImplementation((_, errorCallback) => {
        errorCallback(mockError);
      });
      createMockCollection(mockOnSnapshot);
      const callback = jest.fn();

      // Act
      await travellersApi.observeTravellers(mockUserId, callback);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
      expect(callback).toHaveBeenCalledWith([]);

      consoleSpy.mockRestore();
    });
  });
});
