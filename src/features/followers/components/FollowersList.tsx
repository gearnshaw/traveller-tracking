import { View, Text, Pressable } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Follower } from "../types";

type FollowersListProps = {
  followers: Follower[];
  onManagePress: () => void;
};

const FollowersList = ({ followers, onManagePress }: FollowersListProps) => {
  return (
    <View style={tw`bg-white rounded-2xl p-4 mx-4`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-xl font-semibold`}>Who Can See My Location</Text>
        <Pressable onPress={onManagePress}>
          <Text style={tw`text-primary-600 text-base`}>Manage</Text>
        </Pressable>
      </View>

      {followers.map((follower) => (
        <View
          key={follower.id}
          style={tw`py-4 border-t border-gray-200 flex-row justify-between items-center`}
        >
          <Text style={tw`text-lg`}>{follower.name}</Text>
          <Text
            style={tw`text-base ${
              follower.status === "active" ? "text-green-500" : "text-amber-500"
            }`}
          >
            {follower.status === "active" ? "Active" : "Pending"}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default FollowersList;
