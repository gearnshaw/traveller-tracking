import { View } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Typography } from "@/shared/components/base/Typography";

const TripsScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Typography variant="h4" style={tw`text-primary-600`}>
        Trips Screen
      </Typography>
    </View>
  );
};

export default TripsScreen;
