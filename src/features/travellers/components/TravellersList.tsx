import { View, Text, ActivityIndicator } from 'react-native';
import { useTravellers } from '../hooks/useTravellers';
import tw from 'twrnc';

export const TravellersList = () => {
  const { travellers, isLoading, error } = useTravellers();

  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color={tw.color('primary-500')} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-red-500`}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-4`}>
      {travellers.map((traveller) => (
        <View key={traveller.id} style={tw`bg-white p-4 rounded-lg shadow-sm mb-4`}>
          <Text style={tw`text-lg font-semibold`}>{traveller.name}</Text>
          <Text style={tw`text-gray-600`}>Placeholder text</Text>
        </View>
      ))}
    </View>
  );
};
