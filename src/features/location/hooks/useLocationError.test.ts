import { renderHook } from '@testing-library/react-native';
import { useLocationError } from './useLocationError';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { userDocumentApi } from '@/shared/api/userDocument';
import { locationApi } from '../api';

// Mock dependencies
jest.mock('@/features/auth/hooks/useCurrentUser');
jest.mock('@/shared/api/userDocument');
jest.mock('../api');

describe('useLocationError', () => {
  const mockDate = new Date('2024-03-20T12:00:00Z');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there is a user', () => {
    const mockUserId = 'test-user-123';

    beforeEach(() => {
      // Mock useCurrentUser to return a user
      (useCurrentUser as jest.Mock).mockReturnValue({ userUid: mockUserId });
    });

    describe('when there is no error', () => {
      const dtLastLocationError = null;

      beforeEach(() => {
        // Mock user document observer to return no error
        (userDocumentApi.observeUser as jest.Mock).mockImplementation((_, callback) => {
          callback({ dtLastLocationError });
          return jest.fn();
        });

        // Mock location observer to return a recent update
        (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
          callback({ dtLastUpdated: mockDate });
          return jest.fn();
        });
      });

      it('should return false', () => {
        const expected = false;
        const { result } = renderHook(() => useLocationError());
        expect(result.current).toBe(expected);
      });
    });

    describe('when there is an error', () => {
      const dtLastLocationError = new Date('2024-03-20T12:00:00Z');

      beforeEach(() => {
        // Mock user document observer to return an error
        (userDocumentApi.observeUser as jest.Mock).mockImplementation((_, callback) => {
          callback({ dtLastLocationError });
          return jest.fn();
        });
      });

      describe('when there have been no location updates', () => {
        const dtLastUpdated = null;

        beforeEach(() => {
          // Mock location observer to return no update
          (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
            callback({ dtLastUpdated });
            return jest.fn();
          });
        });

        it('should return true', () => {
          const expected = true;
          const { result } = renderHook(() => useLocationError());
          expect(result.current).toBe(expected);
        });
      });

      describe('when the location update was BEFORE the error', () => {
        const dtLastUpdated = new Date(dtLastLocationError.getTime() - 1000);

        beforeEach(() => {
          // Mock location observer to return an older update
          (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
            callback({ dtLastUpdated });
            return jest.fn();
          });
        });

        it('should return true', () => {
          const expected = true;
          const { result } = renderHook(() => useLocationError());
          expect(result.current).toBe(expected);
        });
      });

      describe('when the location update was AFTER the error', () => {
        const dtLastUpdated = new Date(dtLastLocationError.getTime() + 1000);

        beforeEach(() => {
          // Mock location observer to return an older update
          (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
            callback({ dtLastUpdated });
            return jest.fn();
          });
        });

        it('should return false', () => {
          const expected = false;
          const { result } = renderHook(() => useLocationError());
          expect(result.current).toBe(expected);
        });
      });
    });

    describe('when subscriptions have been set up', () => {
      const mockUnsubscribeUser = jest.fn();
      const mockUnsubscribeLocation = jest.fn();

      beforeEach(() => {
        // Mock both observers to return unsubscribe functions
        (userDocumentApi.observeUser as jest.Mock).mockReturnValue(mockUnsubscribeUser);
        (locationApi.observeLatestLocation as jest.Mock).mockReturnValue(mockUnsubscribeLocation);
      });

      it('should clean up subscriptions when unmounted', () => {
        const { unmount } = renderHook(() => useLocationError());
        unmount();

        expect(mockUnsubscribeUser).toHaveBeenCalledTimes(1);
        expect(mockUnsubscribeLocation).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when there is no user', () => {
    beforeEach(() => {
      // Mock useCurrentUser to return no user
      (useCurrentUser as jest.Mock).mockReturnValue(null);
    });

    it('should not set up observers', () => {
      renderHook(() => useLocationError());

      expect(userDocumentApi.observeUser).not.toHaveBeenCalled();
      expect(locationApi.observeLatestLocation).not.toHaveBeenCalled();
    });
  });
});
