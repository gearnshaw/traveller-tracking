import { Text, View } from "react-native";
import { tw } from "../src/shared/utils/tw";

export default function FollowersScreen() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg text-primary-600`}>Followers Screen</Text>
    </View>
  );
}
