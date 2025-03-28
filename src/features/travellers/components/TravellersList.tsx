import { View, ActivityIndicator } from 'react-native';
import { useTravellers } from '../hooks/useTravellers';
import { TravellerCard } from './TravellerCard';
import { TableSectionHeader } from '@/shared/components/base/TableSectionHeader';
import { Typography } from '@/shared/components/base/Typography';
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
        <Typography variant="body" style={tw`text-red-500`}>
          Error: {error.message}
        </Typography>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <TableSectionHeader
        title="Following"
        actionText="Manage"
        onActionPress={() => {
          // TODO: Implement traveller management
        }}
      />
      {travellers.map((traveller) => (
        <View key={traveller.id} style={tw`mb-4 last:mb-0`}>
          <TravellerCard traveller={traveller} />
        </View>
      ))}
    </View>
  );
};
