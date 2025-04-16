export type LocationInfo = {
  location: string;
  time: string;
  temperature: string;
  weather: string;
  timestamp: number; // Unix timestamp in milliseconds
  timezone: string;
};

export type ReverseGeocodeCity = {
  city: string;
  isoCountryCode: string;
  region: string | null;
  timezone: string;
};

export type Location = ReverseGeocodeCity & {
  id: string;
  dtCreated: Date;
  dtLastUpdated: Date;
};

export type LocationTrackingStatus = 'active' | 'required' | 'not-required';
