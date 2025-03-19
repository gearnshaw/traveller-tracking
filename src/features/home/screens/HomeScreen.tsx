import { View } from "react-native";
import { tw } from "@/shared/utils/tw";
import FollowersList from "@/features/followers/components/FollowersList";
import { useHomeScreen } from "./useHomeScreen";

export const HomeScreen = () => {
  const { followers, handleManagePress } = useHomeScreen();

  return (
    <View style={tw`flex-1 bg-gray-100 pt-14`}>
      <View style={tw`mx-4`}>
        <FollowersList
          followers={followers}
          onManagePress={handleManagePress}
        />
      </View>
    </View>
  );
};
