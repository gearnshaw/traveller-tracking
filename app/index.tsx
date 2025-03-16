import { Text, View } from "react-native";
import { tw } from "../src/services/tailwind";

export default function Index() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg text-primary-600`}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
