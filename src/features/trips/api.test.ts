import { tripsApi } from "./api";
import { db } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Mock Firebase
jest.mock("../../services/firebase", () => ({
  db: {
    collection: jest.fn(),
  },
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe("tripsApi", () => {
  const mockTrip = {
    userId: "user123",
    title: "Test Trip",
    description: "Test Description",
    startDate: new Date(),
    endDate: new Date(),
    location: "Test Location",
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTrips", () => {
    it("should fetch trips for a given user", async () => {
      const mockSnapshot = {
        docs: [
          {
            id: "trip123",
            data: () => ({
              ...mockTrip,
              startDate: { toDate: () => mockTrip.startDate },
              endDate: { toDate: () => mockTrip.endDate },
              createdAt: { toDate: () => mockTrip.createdAt },
              updatedAt: { toDate: () => mockTrip.updatedAt },
            }),
          },
        ],
      };

      (getDocs as jest.Mock).mockResolvedValueOnce(mockSnapshot);

      const result = await tripsApi.getTrips("user123");

      expect(collection).toHaveBeenCalledWith(db, "trips");
      expect(query).toHaveBeenCalled();
      expect(where).toHaveBeenCalledWith("userId", "==", "user123");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: "trip123",
        ...mockTrip,
      });
    });
  });
});
