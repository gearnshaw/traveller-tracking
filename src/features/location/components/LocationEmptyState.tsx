import { View, Text, Pressable } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { Typography } from '@/shared/components/base/Typography';

type LocationEmptyStateProps = {
  onEnableLocation: () => void;
};

export const LocationEmptyState = ({ onEnableLocation }: LocationEmptyStateProps) => {
  return (
    <View style={tw`items-center py-2`}>
      <Typography variant="cardSubheader" style={tw`text-center`}>
        City sharing is not switched on
      </Typography>
      <Typography variant="secondary" style={tw`mt-2 text-center text-gray-500`}>
        Do you want your followers to see your current city, time and weather?
      </Typography>
      <Pressable
        onPress={onEnableLocation}
        style={tw`mt-4 bg-blue-500 rounded-lg px-4 py-2`}
        accessibilityRole="button"
        accessibilityLabel="Share my city"
      >
        <Text style={tw`text-white font-medium`}>Share my city</Text>
      </Pressable>
    </View>
  );
};
