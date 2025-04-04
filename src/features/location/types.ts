export type LocationInfo = {
  location: string;
  time: string;
  temperature: string;
  weather: string;
};

export type Location = {
  id: string;
  description: string;
  dtCreated: Date;
};

export type LocationState = LocationInfo & {
  isLoading: boolean;
  error: string | null;
};

export type LocationTrackingStatus = 'active' | 'required' | 'not-required';
