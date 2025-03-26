import { followersApi } from './api';
import { db } from '@/services/firebase';
import { FollowerStatus } from './types';

// Mock Firebase
jest.mock('@/services/firebase', () => ({
  db: {
    collection: jest.fn()
  }
}));

describe('followersApi', () => {
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

  describe(followersApi.observeFollowers.name, () => {
    it('should set up a snapshot listener and return unsubscribe function', async () => {
      // Arrange
      const mockUnsubscribe = jest.fn();
      const mockOnSnapshot = jest.fn().mockReturnValue(mockUnsubscribe);
      createMockCollection(mockOnSnapshot);

      // Act
      const unsubscribe = await followersApi.observeFollowers(mockUserId, jest.fn());

      // Assert
      expect(db.collection).toHaveBeenCalledWith(`users/${mockUserId}/followers`);
      expect(mockOnSnapshot).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
      expect(unsubscribe).toBe(mockUnsubscribe);
    });

    it('should map and return followers when snapshot is received', async () => {
      // Arrange
      const mockSnapshot = createMockSnapshot([
        { id: '1', data: () => ({ name: 'John', status: FollowerStatus.Active }) },
        { id: '2', data: () => ({ name: 'Jane', status: FollowerStatus.Pending }) }
      ]);

      const expectedFollowers = [
        { id: '1', name: 'John', status: FollowerStatus.Active },
        { id: '2', name: 'Jane', status: FollowerStatus.Pending }
      ];

      const mockOnSnapshot = jest.fn().mockImplementation((successCallback) => {
        successCallback(mockSnapshot);
      });
      createMockCollection(mockOnSnapshot);
      const callback = jest.fn();

      // Act
      await followersApi.observeFollowers(mockUserId, callback);

      // Assert
      expect(callback).toHaveBeenCalledWith(expectedFollowers);
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
      await followersApi.observeFollowers(mockUserId, callback);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
      expect(callback).toHaveBeenCalledWith([]);

      consoleSpy.mockRestore();
    });
  });
});
