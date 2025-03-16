import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { Trip } from "./types";

export const tripsApi = {
  getTrips: async (userId: string) => {
    const tripsRef = collection(db, "trips");
    const q = query(tripsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Trip[];
  },

  addTrip: async (trip: Omit<Trip, "id">) => {
    const tripsRef = collection(db, "trips");
    const docRef = await addDoc(tripsRef, trip);
    return { id: docRef.id, ...trip };
  },

  updateTrip: async (tripId: string, updates: Partial<Trip>) => {
    const tripRef = doc(db, "trips", tripId);
    await updateDoc(tripRef, updates);
    return { id: tripId, ...updates };
  },

  deleteTrip: async (tripId: string) => {
    const tripRef = doc(db, "trips", tripId);
    await deleteDoc(tripRef);
    return tripId;
  },
};
