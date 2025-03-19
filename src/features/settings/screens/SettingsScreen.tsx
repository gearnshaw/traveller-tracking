import { Text, View } from "react-native";
import { tw } from "@/shared/utils/tw";

const SettingsScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg text-primary-600`}>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;
