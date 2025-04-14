import { auth } from '@/services/firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

/**
 * Auth service for handling authentication-related operations
 */
export const authService = {
  /**
   * Get the current user's ID
   * @returns string | null - The current user's ID or null if not authenticated
   */
  getCurrentUserId: (): string | null => {
    return auth.currentUser?.uid ?? null;
  },

  /**
   * Subscribe to authentication state changes
   * @param callback - Function to be called when auth state changes
   * @returns Unsubscribe function
   */
  onAuthStateChanged: (callback: (user: FirebaseAuthTypes.User | null) => void) => {
    return auth.onAuthStateChanged(callback);
  }
};
