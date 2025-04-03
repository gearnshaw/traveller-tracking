import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { useLocation } from '../hooks/useLocation';
import { Typography } from '@/shared/components/base/Typography';
import { Card } from '@/shared/components/base/Card';
import { TableSectionHeader } from '@/shared/components/base/TableSectionHeader';
import { LocationEmptyState } from './LocationEmptyState';

type LocationCardProps = {
  onUpdate?: () => void;
};

export const LocationCard = ({ onUpdate }: LocationCardProps) => {
  const { location, time, temperature, weather, isLoading, isLocationEnabled, handleUpdate } =
    useLocation({
      onUpdate
    });

  return (
    <View>
      <TableSectionHeader title="My Location" />
      <Card style={tw`p-4`}>
        {!isLocationEnabled ? (
          <LocationEmptyState onEnableLocation={handleUpdate} />
        ) : (
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-1`}>
              <Typography variant="cardSubheader">{location}</Typography>
              <Typography variant="body" style={tw`mt-1`}>
                {time} • {temperature}, {weather}
              </Typography>
              <Typography variant="secondary" style={tw`mt-2 text-gray-500`}>
                Updated just now
              </Typography>
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
        )}
      </Card>
    </View>
  );
};
