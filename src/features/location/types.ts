export type LocationInfo = {
  location: string;
  time: string;
  temperature: string;
  weather: string;
};

export type LocationState = LocationInfo & {
  isLoading: boolean;
  error: string | null;
  isLocationEnabled: boolean;
};
