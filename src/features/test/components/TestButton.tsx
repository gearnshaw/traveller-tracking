import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { trackBackgroundLocationError } from '@/features/location/analytics';
import { testLogger } from '../logger';
import { userDocumentApi } from '@/shared/api/userDocument';
import { Button } from '@/shared/components/base/Button';

export const TestButton = () => {
  const userId = useCurrentUser()?.userUid;

  const doTest = async () => {
    testLogger.debug('Test button pressed!');

    const error = {
      message: 'Test error',
      code: 'test_error'
    };

    testLogger.error('Background location task error:', error);
    trackBackgroundLocationError(error.message, {
      source: 'background_location_task',
      code: error.code
    });

    // Update user's last error timestamp
    if (userId) {
      await userDocumentApi.updateUser(userId, {
        dtLastLocationError: new Date()
      });
    }
  };

  const handlePress = () => {
    doTest();
  };

  return <Button onPress={handlePress}>TEST</Button>;
};
