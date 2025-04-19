import { renderHook, act } from '@testing-library/react-native';
import { useLocationError } from './useLocationError';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { userDocumentApi } from '@/shared/api/userDocument';
import { locationApi } from '../api';

// Mock dependencies
jest.mock('@/features/auth/hooks/useCurrentUser');
jest.mock('@/shared/api/userDocument');
jest.mock('../api');

describe('useLocationError', () => {
  const mockUserId = 'test-user-123';
  const mockDate = new Date('2024-03-20T12:00:00Z');

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock useCurrentUser to return a user
    (useCurrentUser as jest.Mock).mockReturnValue({ userUid: mockUserId });
  });

  it('should return false when there is no error', () => {
    // Mock user document observer to return no error
    (userDocumentApi.observeUser as jest.Mock).mockImplementation((_, callback) => {
      callback({ dtLastLocationError: null });
      return jest.fn();
    });

    // Mock location observer to return a recent update
    (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
      callback({ dtLastUpdated: mockDate });
      return jest.fn();
    });

    const { result } = renderHook(() => useLocationError());
    expect(result.current).toBe(false);
  });

  it('should return true when there is an error and no recent update', () => {
    // Mock user document observer to return an error
    (userDocumentApi.observeUser as jest.Mock).mockImplementation((_, callback) => {
      callback({ dtLastLocationError: mockDate });
      return jest.fn();
    });

    // Mock location observer to return no update
    (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
      callback(null);
      return jest.fn();
    });

    const { result } = renderHook(() => useLocationError());
    expect(result.current).toBe(true);
  });

  it('should return true when error timestamp is more recent than last update', () => {
    const errorDate = new Date(mockDate.getTime() + 1000); // 1 second after last update

    // Mock user document observer to return a recent error
    (userDocumentApi.observeUser as jest.Mock).mockImplementation((_, callback) => {
      callback({ dtLastLocationError: errorDate });
      return jest.fn();
    });

    // Mock location observer to return an older update
    (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
      callback({ dtLastUpdated: mockDate });
      return jest.fn();
    });

    const { result } = renderHook(() => useLocationError());
    expect(result.current).toBe(true);
  });

  it('should return false when last update is more recent than error', () => {
    const errorDate = new Date(mockDate.getTime() - 1000); // 1 second before last update

    // Mock user document observer to return an older error
    (userDocumentApi.observeUser as jest.Mock).mockImplementation((_, callback) => {
      callback({ dtLastLocationError: errorDate });
      return jest.fn();
    });

    // Mock location observer to return a recent update
    (locationApi.observeLatestLocation as jest.Mock).mockImplementation((_, callback) => {
      callback({ dtLastUpdated: mockDate });
      return jest.fn();
    });

    const { result } = renderHook(() => useLocationError());
    expect(result.current).toBe(false);
  });

  it('should clean up subscriptions when unmounted', () => {
    const mockUnsubscribe = jest.fn();

    // Mock both observers to return unsubscribe functions
    (userDocumentApi.observeUser as jest.Mock).mockReturnValue(mockUnsubscribe);
    (locationApi.observeLatestLocation as jest.Mock).mockReturnValue(mockUnsubscribe);

    const { unmount } = renderHook(() => useLocationError());
    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(2);
  });

  it('should not set up observers when there is no user', () => {
    // Mock useCurrentUser to return no user
    (useCurrentUser as jest.Mock).mockReturnValue(null);

    renderHook(() => useLocationError());

    expect(userDocumentApi.observeUser).not.toHaveBeenCalled();
    expect(locationApi.observeLatestLocation).not.toHaveBeenCalled();
  });
});
