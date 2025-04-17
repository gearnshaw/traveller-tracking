import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { userDocumentApi } from '@/shared/api/userDocument';
import { locationApi } from '../api';

export const useLocationError = () => {
  const [hasError, setHasError] = useState(false);
  const [dtLastLocationError, setDtLastLocationError] = useState<Date | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const userId = useCurrentUser()?.userUid;

  useEffect(() => {
    if (!userId) return;

    // Set up user document observer
    const userUnsubscribe = userDocumentApi.observeUser(userId, (user) => {
      const newDtLastLocationError = user?.dtLastLocationError;
      setDtLastLocationError(newDtLastLocationError || null);
    });

    // Set up location observer
    const locationUnsubscribe = locationApi.observeLatestLocation(userId, (latestLocation) => {
      setLastUpdateTime(latestLocation?.dtLastUpdated || null);
    });

    return () => {
      userUnsubscribe();
      locationUnsubscribe();
    };
  }, [userId]);

  // Update error state whenever either timestamp changes
  useEffect(() => {
    setHasError(
      dtLastLocationError
        ? lastUpdateTime
          ? dtLastLocationError > lastUpdateTime
            ? true
            : false
          : true
        : true
    );
  }, [dtLastLocationError, lastUpdateTime]);

  return hasError;
};
