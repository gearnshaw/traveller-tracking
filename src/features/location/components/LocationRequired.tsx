import { View, Text, Pressable } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { Typography } from '@/shared/components/base/Typography';
import { useLocationEnabling } from '../hooks/useLocationEnabling';

type LocationRequiredProps = {
  onUpdate?: () => void;
};

export const LocationRequired = ({ onUpdate }: LocationRequiredProps) => {
  const { enableLocation } = useLocationEnabling(onUpdate);

  return (
    <View style={tw`items-center py-2`}>
      <Typography variant="cardSubheader" style={tw`text-center`}>
        City sharing is not switched on
      </Typography>
      <Typography variant="secondary" style={tw`mt-2 text-center text-gray-500`}>
        Do you want your followers to see your current city, time and weather?
      </Typography>
      <Pressable
        onPress={enableLocation}
        style={tw`mt-4 bg-blue-500 rounded-lg px-4 py-2`}
        accessibilityRole="button"
        accessibilityLabel="Share my city"
      >
        <Text style={tw`text-white font-medium`}>Share my city</Text>
      </Pressable>
    </View>
  );
};
