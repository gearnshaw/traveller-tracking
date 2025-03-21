import { View } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Typography } from "@/shared/components/base/Typography";

const SettingsScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Typography variant="pageTitle" style={tw`text-primary-600`}>
        Settings Screen
      </Typography>
    </View>
  );
};

export default SettingsScreen;
