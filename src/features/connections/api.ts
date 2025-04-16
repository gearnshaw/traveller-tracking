import { Connection } from './types';
import { db } from '@/services/firebase';
import { mapConnection, RawConnection } from './utils';

const getConnectionsPath = (userId: string) => `users/${userId}/connections`;

export const connectionsApi = {
  observeConnections: async (
    userId: string,
    callback: (connections: Connection[]) => void
  ): Promise<() => void> => {
    const unsubscribe = db.collection(getConnectionsPath(userId)).onSnapshot(
      (snapshot) => {
        const connections = snapshot.docs.map((doc) =>
          mapConnection(doc.id, doc.data() as RawConnection)
        );
        callback(connections);
      },
      (error) => {
        console.error('Error observing connections:', error);
        callback([]);
      }
    );
    return unsubscribe;
  }
};
