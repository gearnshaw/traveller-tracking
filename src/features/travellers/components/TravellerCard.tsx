import { View, Text } from 'react-native';
import tw from 'twrnc';
import { Traveller } from '../types';

interface TravellerCardProps {
  traveller: Traveller;
}

export const TravellerCard = ({ traveller }: TravellerCardProps) => {
  // Get first letter of name for avatar
  const initial = traveller.name.charAt(0);

  return (
    <View style={tw`bg-white rounded-lg shadow-sm mb-4 overflow-hidden`}>
      {/* Header */}
      <View style={tw`bg-blue-500 p-4`}>
        <Text style={tw`text-white text-xl font-bold`}>{traveller.name}</Text>
      </View>

      {/* Content */}
      <View style={tw`p-4 flex-row`}>
        {/* Avatar */}
        <View style={tw`w-16 h-16 rounded-full bg-blue-100 items-center justify-center mr-4`}>
          <Text style={tw`text-2xl text-blue-500`}>{initial}</Text>
        </View>

        {/* Info */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-xl font-bold`}>Tokyo, Japan</Text>
          <Text style={tw`text-lg mt-1`}>10:45 PM • 16°C, Clear Night</Text>
          <Text style={tw`text-gray-500 mt-2`}>Updated 2 hours ago</Text>
        </View>
      </View>
    </View>
  );
};
