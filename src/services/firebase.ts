// import { initializeApp } from "firebase/app";
import RNAuth from '@react-native-firebase/auth';
import RNFirestore from '@react-native-firebase/firestore';

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
export const auth = RNAuth();
export const db = RNFirestore();
