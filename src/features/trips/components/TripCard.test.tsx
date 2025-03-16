import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TripCard } from "./TripCard";

describe("TripCard", () => {
  const mockTrip = {
    id: "trip123",
    userId: "user123",
    title: "Test Trip",
    description: "Test Description",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-07"),
    location: "Test Location",
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("renders trip information correctly", () => {
    const { getByText } = render(<TripCard trip={mockTrip} />);

    expect(getByText("Test Trip")).toBeTruthy();
    expect(getByText("Test Location")).toBeTruthy();
    expect(getByText("Test Description")).toBeTruthy();
    expect(getByText("1/1/2024 - 1/7/2024")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TripCard trip={mockTrip} onPress={onPress} />
    );

    fireEvent.press(getByText("Test Trip"));
    expect(onPress).toHaveBeenCalled();
  });

  it("shows archive button when onArchive is provided", () => {
    const onArchive = jest.fn();
    const { getByText } = render(
      <TripCard trip={mockTrip} onArchive={onArchive} />
    );

    const archiveButton = getByText("Archive");
    expect(archiveButton).toBeTruthy();

    fireEvent.press(archiveButton);
    expect(onArchive).toHaveBeenCalled();
  });

  it("shows unarchive button when trip is archived", () => {
    const onArchive = jest.fn();
    const archivedTrip = { ...mockTrip, isArchived: true };
    const { getByText } = render(
      <TripCard trip={archivedTrip} onArchive={onArchive} />
    );

    expect(getByText("Unarchive")).toBeTruthy();
  });
});
