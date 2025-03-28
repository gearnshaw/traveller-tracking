import { View, Text, ActivityIndicator } from 'react-native';
import { useTravellers } from '../hooks/useTravellers';
import { TravellerCard } from './TravellerCard';
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
        <TravellerCard key={traveller.id} traveller={traveller} />
      ))}
    </View>
  );
};
