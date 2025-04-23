import { travellersApi } from './api';
import { db } from '@/services/firebase';
import { TravellerBuilder } from './builders';

// Mock Firebase
jest.mock('@/services/firebase', () => ({
  db: {
    collection: jest.fn()
  }
}));

// Mock the logger service
jest.mock('@/services/logger', () => ({
  createFeatureLogger: jest.fn().mockReturnValue({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }),
  log: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
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
        { id: '1', data: () => ({ name: 'John', userId: '123' }) },
        { id: '2', data: () => ({ name: 'Jane', userId: '456' }) }
      ]);

      const expectedTravellers = [
        new TravellerBuilder().withId('1').withName('John').withUserId('123').build(),
        new TravellerBuilder().withId('2').withName('Jane').withUserId('456').build()
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

    it('should return empty array when snapshot fails', async () => {
      // Arrange
      const mockError = new Error('Firestore error');

      const mockOnSnapshot = jest.fn().mockImplementation((_, errorCallback) => {
        errorCallback(mockError);
      });
      createMockCollection(mockOnSnapshot);
      const callback = jest.fn();

      // Act
      await travellersApi.observeTravellers(mockUserId, callback);

      // Assert
      expect(callback).toHaveBeenCalledWith([]);
      // Verify that error was logged
      expect(require('@/services/logger').createFeatureLogger().error).toHaveBeenCalledWith(
        'Error observing travellers:',
        mockError
      );
    });
  });
});
