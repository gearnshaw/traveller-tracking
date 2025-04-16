import { ScrollView, View } from 'react-native';
import { tw } from '@/shared/utils/tw';
import FollowersList from '@/features/followers/components/FollowersList';
import { ConnectionsList } from '@/features/connections/components/ConnectionsList';
import { useHomeScreen } from './useHomeScreen';
import { Button } from '@/shared/components/base/Button';
import { LocationCard } from '@/features/location/components/LocationCard';

export const HomeScreen = () => {
  const { handleLogout } = useHomeScreen();

  return (
    <ScrollView
      style={tw`flex-1 bg-gray-100`}
      contentContainerStyle={tw`pt-14 pb-4`}
      showsVerticalScrollIndicator={false}
    >
      <View style={tw`mx-4`}>
        <LocationCard />

        <View style={tw`mt-8`}>
          <ConnectionsList />
        </View>

        <View style={tw`mt-8`}>
          <FollowersList />
        </View>

        <View style={tw`mt-8`}>
          <Button variant="secondary" onPress={handleLogout} style={tw`w-full`}>
            Log Out
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
