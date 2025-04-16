import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { Traveller } from '../types';
import { Card } from '@/shared/components/base/Card';
import { CardHeader } from '@/shared/components/common/CardHeader';
import { Typography } from '@/shared/components/base/Typography';
import { useTravellerLocation } from '../hooks/useTravellerLocation';
import { LocationInfo } from '@/shared/components/common/LocationInfo';

type TravellerCardProps = {
  traveller: Traveller;
};

export const TravellerCard = ({ traveller }: TravellerCardProps) => {
  // Get first letter of name for avatar
  const initial = traveller.name.charAt(0);
  const { location, isLoading } = useTravellerLocation(traveller.userId);

  return (
    <Card style={tw`px-0 overflow-hidden`}>
      <CardHeader title={traveller.name} />

      {/* Content */}
      <View style={tw`p-4 flex-row`}>
        {/* Avatar */}
        <View style={tw`w-16 h-16 rounded-full bg-blue-100 items-center justify-center mr-4`}>
          <Text style={tw`text-2xl text-blue-500`}>{initial}</Text>
        </View>

        {/* Info */}
        <View style={tw`flex-1`}>
          {isLoading ? (
            <ActivityIndicator size="small" color={tw.color('primary-500')} />
          ) : location ? (
            <LocationInfo
              location={`${location.city}, ${location.isoCountryCode}`}
              timezone={location.timezone}
              temperature="15°C"
              weather="Cloudy"
              timestamp={location.dtLastUpdated?.getTime() ?? Date.now()}
            />
          ) : (
            <Typography variant="secondary">Location unavailable</Typography>
          )}
        </View>
      </View>
    </Card>
  );
};
