import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { useLocation } from '../hooks/useLocation';

type LocationCardProps = {
  onUpdate?: () => void;
};

export const LocationCard = ({ onUpdate }: LocationCardProps) => {
  const { location, time, temperature, weather, isLoading, handleUpdate } = useLocation({
    onUpdate
  });

  return (
    <View style={tw`bg-blue-50 rounded-xl p-4`}>
      <View style={tw`flex-row justify-between items-start`}>
        <View>
          <Text style={tw`text-2xl font-bold text-gray-900`}>{location}</Text>
          <Text style={tw`text-base text-gray-600 mt-1`}>
            {time} • {temperature}, {weather}
          </Text>
        </View>
        <Pressable
          onPress={handleUpdate}
          disabled={isLoading}
          style={tw`bg-blue-500 rounded-lg px-4 py-2`}
          accessibilityRole="button"
          accessibilityLabel="Update location"
          accessibilityState={{ disabled: isLoading }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={tw`text-white font-medium`}>Update</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};
