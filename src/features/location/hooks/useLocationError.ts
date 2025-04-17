import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { userDocumentApi } from '@/shared/api/userDocument';
import { locationApi } from '../api';

export const useLocationError = () => {
  const [hasError, setHasError] = useState(false);
  const userId = useCurrentUser()?.userUid;

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = userDocumentApi.observeUser(userId, async (user) => {
      if (!user?.dtLastLocationError) {
        setHasError(false);
        return;
      }

      const latestLocation = await locationApi.getLatestLocation(userId);
      const lastUpdateTime = latestLocation?.dtLastUpdated;

      setHasError(lastUpdateTime ? user.dtLastLocationError > lastUpdateTime : true);
    });

    return () => unsubscribe();
  }, [userId]);

  return hasError;
};
