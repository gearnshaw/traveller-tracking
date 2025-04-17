import RNAuth from '@react-native-firebase/auth';
import RNFirestore from '@react-native-firebase/firestore';
import RNAnalytics from '@react-native-firebase/analytics';

// Suppress the deprecation warning for Firebase
declare global {
  var RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS: boolean;
}

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
// END OF Suppress the deprecation warning for Firebase

export const auth = RNAuth();
export const db = RNFirestore();
export const analytics = RNAnalytics();
