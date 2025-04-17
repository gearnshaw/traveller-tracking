import { db } from '@/services/firebase';
import { User } from '@/features/user/types';
import { Timestamp } from '@react-native-firebase/firestore';

type RawUser = Omit<User, 'dtLastLocationError'> & {
  dtLastLocationError?: Timestamp;
};

const mapUser = (id: string, raw: RawUser): User => ({
  id,
  dtLastLocationError: raw.dtLastLocationError?.toDate()
});

export const userDocumentApi = {
  observeUser: (userId: string, onUserUpdate: (user: User | null) => void) => {
    return db
      .collection('users')
      .doc(userId)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          onUserUpdate(null);
          return;
        }
        onUserUpdate(mapUser(doc.id, doc.data() as RawUser));
      });
  },

  updateUser: async (userId: string, data: Partial<User>) => {
    await db.collection('users').doc(userId).update(data);
  }
};
