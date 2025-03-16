import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Trip } from "../types";
import { Button } from "../../../shared/components/Button";

interface TripCardProps {
  trip: Trip;
  onPress?: () => void;
  onArchive?: () => void;
}

export const TripCard = ({ trip, onPress, onArchive }: TripCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.location}>{trip.location}</Text>
        <Text style={styles.dates}>
          {trip.startDate.toLocaleDateString()} -{" "}
          {trip.endDate.toLocaleDateString()}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {trip.description}
        </Text>
        {onArchive && (
          <Button
            variant="outline"
            onPress={onArchive}
            style={styles.archiveButton}
          >
            {trip.isArchived ? "Unarchive" : "Archive"}
          </Button>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  dates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 12,
  },
  archiveButton: {
    alignSelf: "flex-end",
  },
});
