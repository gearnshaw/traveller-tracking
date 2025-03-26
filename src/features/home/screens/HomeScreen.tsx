import { ScrollView, View } from 'react-native';
import { tw } from '@/shared/utils/tw';
import FollowersList from '@/features/followers/components/FollowersList';
import { useHomeScreen } from './useHomeScreen';
import { Button } from '@/shared/components/base/Button';

export const HomeScreen = () => {
  const { followers, handleManagePress, handleLogout } = useHomeScreen();

  return (
    <ScrollView
      style={tw`flex-1 bg-gray-100`}
      contentContainerStyle={tw`pt-14 pb-4`}
      showsVerticalScrollIndicator={false}
    >
      <View style={tw`mx-4`}>
        <FollowersList followers={followers} onManagePress={handleManagePress} />

        {/* Add more sections here as needed */}
      </View>

      <View style={tw`mt-8 mx-4`}>
        <Button variant="secondary" onPress={handleLogout} style={tw`w-full`}>
          Log Out
        </Button>
      </View>
    </ScrollView>
  );
};
