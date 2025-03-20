import React from "react";
import { View, Pressable } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Trip } from "../types";
import { Button } from "@/shared/components/Button";
import { Typography } from "@/shared/components/base/Typography";

interface TripCardProps {
  trip: Trip;
  onPress?: () => void;
  onArchive?: () => void;
}

export const TripCard = ({ trip, onPress, onArchive }: TripCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={tw`bg-white rounded-xl p-4 my-2 mx-4 shadow-sm`}>
        <Typography variant="cardTitle" style={tw`mb-1`}>
          {trip.title}
        </Typography>
        <Typography variant="body" style={tw`text-gray-600 mb-1`}>
          {trip.location}
        </Typography>
        <Typography variant="secondary" style={tw`text-gray-600 mb-2`}>
          {trip.startDate.toLocaleDateString()} -{" "}
          {trip.endDate.toLocaleDateString()}
        </Typography>
        <Typography
          variant="secondary"
          style={tw`text-gray-700 mb-3`}
          numberOfLines={2}
        >
          {trip.description}
        </Typography>
        {onArchive && (
          <Button variant="outline" onPress={onArchive} style={tw`self-end`}>
            {trip.isArchived ? "Unarchive" : "Archive"}
          </Button>
        )}
      </View>
    </Pressable>
  );
};
