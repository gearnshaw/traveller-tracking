import { View } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { Typography } from '@/shared/components/base/Typography';
import { useScreenAnalytics } from '@/shared/hooks/useScreenAnalytics';

const TripsScreen = () => {
  useScreenAnalytics('TripsScreen', 'Main');

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Typography variant="pageTitle" style={tw`text-primary-600`}>
        Trips Screen
      </Typography>
    </View>
  );
};

export default TripsScreen;
