import { trackBackgroundLocationError } from '@/features/location/analytics';
import { testLogger } from '../logger';
import { Button } from '@/shared/components/base/Button';
import { flush } from '@/services/mixpanel';

export const TestButton = () => {
  const doTest = async () => {
    testLogger.debug('Test button pressed!');

    const error = {
      message: 'Test error',
      code: 'test_error'
    };

    testLogger.error('Test error error:', JSON.stringify(error));
    trackBackgroundLocationError(error.message, {
      source: 'test_error',
      code: error.code
    });

    // Flush the mixpanel buffer
    flush();
  };

  const handlePress = () => {
    doTest();
  };

  return <Button onPress={handlePress}>TEST</Button>;
};
