import { ScrollView, View } from 'react-native';
import { tw } from '@/shared/utils/tw';
import FollowersList from '@/features/followers/components/FollowersList';
import { TravellersList } from '@/features/travellers/components/TravellersList';
import { useHomeScreen } from './useHomeScreen';
import { Button } from '@/shared/components/base/Button';

export const HomeScreen = () => {
  const { handleLogout } = useHomeScreen();

  return (
    <ScrollView
      style={tw`flex-1 bg-gray-100`}
      contentContainerStyle={tw`pt-14 pb-4`}
      showsVerticalScrollIndicator={false}
    >
      <View style={tw`mx-4`}>
        <FollowersList />
      </View>

      <View style={tw`mt-8 mx-4`}>
        <TravellersList />
      </View>

      <View style={tw`mt-8 mx-4`}>
        <Button variant="secondary" onPress={handleLogout} style={tw`w-full`}>
          Log Out
        </Button>
      </View>
    </ScrollView>
  );
};
