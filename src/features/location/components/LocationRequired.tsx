import { View } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { Typography } from '@/shared/components/base/Typography';
import { Button } from '@/shared/components/base/Button';
import { useLocationEnabling } from '../hooks/useLocationEnabling';

type LocationRequiredProps = {
  onUpdate?: () => void;
};

export const LocationRequired = ({ onUpdate }: LocationRequiredProps) => {
  const { enableLocation, error } = useLocationEnabling(onUpdate);

  return (
    <View style={tw`items-center py-2`}>
      <Typography variant="cardSubheader" style={tw`text-center`}>
        City sharing is not switched on
      </Typography>
      <Typography variant="secondary" style={tw`mt-2 text-center text-gray-500`}>
        Do you want your followers to see your current city, time and weather?
      </Typography>
      <Button onPress={enableLocation} style={tw`mt-4`} accessibilityLabel="Share my city">
        Share my city
      </Button>
      {error && (
        <Typography variant="secondary" style={tw`mt-2 text-red-500`}>
          {error}
        </Typography>
      )}
    </View>
  );
};
