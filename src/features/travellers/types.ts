import { Location } from '@/features/location/types';

export type Traveller = {
  id: string;
  name: string;
  userId: string;
  location?: Location;
};
