import { View } from "react-native";
import { tw } from "@/shared/utils/tw";
import FollowersList from "@/features/followers/components/FollowersList";
import { Follower } from "@/features/followers/types";

const sampleFollowers: Follower[] = [
  { id: "1", name: "Mum", status: "active" },
  { id: "2", name: "Dad", status: "active" },
  { id: "3", name: "Sarah", status: "pending" },
];

const HomeScreen = () => {
  const handleManagePress = () => {
    // Will implement later
  };

  return (
    <View style={tw`flex-1 bg-gray-100 pt-14`}>
      <FollowersList
        followers={sampleFollowers}
        onManagePress={handleManagePress}
      />
    </View>
  );
};

export default HomeScreen;
