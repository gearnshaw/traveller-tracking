import { locationApi } from './api';
import { saveOrUpdateLocation } from './actions';
import { Location, ReverseGeocodeCity } from './types';
import { locationService } from '@/services/location';

class CityInfoBuilder {
  private city = 'London';
  private region = 'England';
  private isoCountryCode = 'GB';
  private timezone = 'Europe/London';

  withCity(city: string) {
    this.city = city;
    return this;
  }

  build() {
    return {
      city: this.city,
      region: this.region,
      isoCountryCode: this.isoCountryCode,
      timezone: this.timezone
    };
  }
}

class LocationBuilder {
  private id: string = 'test-id';
  private dtCreated = new Date();
  private dtLastUpdated = new Date();
  private city = 'London';
  private region = 'England';
  private isoCountryCode = 'GB';
  private timezone = 'Europe/London';

  makeForCityInfo(cityInfo: ReverseGeocodeCity) {
    this.city = cityInfo.city;
    this.region = cityInfo.region ?? 'Unknown Region';
    this.isoCountryCode = cityInfo.isoCountryCode;
    this.timezone = cityInfo.timezone;
    return this;
  }

  makeForUnknownCity() {
    this.city = 'Unknown City';
    this.region = 'Unknown Region';
    this.isoCountryCode = 'Unknown';
    this.timezone = 'Unknown';
    return this;
  }

  build(): Location {
    return {
      id: this.id,
      dtCreated: this.dtCreated,
      dtLastUpdated: this.dtLastUpdated,
      city: this.city,
      region: this.region,
      isoCountryCode: this.isoCountryCode,
      timezone: this.timezone
    };
  }

  buildWithoutId(): Omit<Location, 'id'> {
    return {
      dtCreated: this.dtCreated,
      dtLastUpdated: this.dtLastUpdated,
      city: this.city,
      region: this.region,
      isoCountryCode: this.isoCountryCode,
      timezone: this.timezone
    };
  }
}

// Mock the locationApi and locationService
jest.mock('./api', () => ({
  locationApi: {
    saveLocation: jest.fn(),
    updateLocation: jest.fn(),
    getLatestLocation: jest.fn()
  }
}));

jest.mock('@/services/location', () => ({
  locationService: {
    getCityFromCoordinates: jest.fn()
  }
}));

describe('savePositionAsLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const userId = 'test-user-id';
  const mockId = 'test-id';

  const position = {
    latitude: 51.5074,
    longitude: -0.1278
  };

  describe('when there is valid city information', () => {
    let cityInfo: ReverseGeocodeCity;

    beforeEach(() => {
      cityInfo = new CityInfoBuilder().build();
      (locationService.getCityFromCoordinates as jest.Mock).mockResolvedValue(cityInfo);
    });

    describe('when there is no existing location', () => {
      beforeEach(() => {
        (locationApi.getLatestLocation as jest.Mock).mockResolvedValue(null);
      });

      it('should save a new location', async () => {
        await saveOrUpdateLocation(position, userId);

        expect(locationApi.saveLocation).toHaveBeenCalledWith(
          userId,
          expect.objectContaining({
            city: cityInfo.city,
            region: cityInfo.region,
            isoCountryCode: cityInfo.isoCountryCode,
            timezone: cityInfo.timezone
          })
        );
      });
    });

    describe('when there is an existing location', () => {
      describe('and the city is the same', () => {
        let existingLocation: Location;

        beforeEach(() => {
          existingLocation = new LocationBuilder().makeForCityInfo(cityInfo).build();
          (locationApi.getLatestLocation as jest.Mock).mockResolvedValue(existingLocation);
        });

        it('should update the location', async () => {
          await saveOrUpdateLocation(position, userId);
          expect(locationApi.updateLocation).toHaveBeenCalledWith(userId, existingLocation);
        });

        it('should NOT save a new location', async () => {
          await saveOrUpdateLocation(position, userId);
          expect(locationApi.saveLocation).not.toHaveBeenCalled();
        });
      });

      describe('and the city is different', () => {
        let existingLocation: Location;
        let differentCityInfo: ReverseGeocodeCity;

        beforeEach(() => {
          differentCityInfo = new CityInfoBuilder().withCity('Paris').build();
          existingLocation = new LocationBuilder().makeForCityInfo(differentCityInfo).build();
          (locationApi.getLatestLocation as jest.Mock).mockResolvedValue(existingLocation);
        });

        it('should save a new location', async () => {
          await saveOrUpdateLocation(position, userId);

          expect(locationApi.saveLocation).toHaveBeenCalledWith(
            userId,
            expect.objectContaining({
              city: cityInfo.city,
              region: cityInfo.region,
              isoCountryCode: cityInfo.isoCountryCode,
              timezone: cityInfo.timezone
            })
          );
        });

        it('should NOT update the location', async () => {
          await saveOrUpdateLocation(position, userId);
          expect(locationApi.updateLocation).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when there is no city information', () => {
    beforeEach(() => {
      (locationService.getCityFromCoordinates as jest.Mock).mockResolvedValue(null);
    });

    it('should save a new location with unknown city information', async () => {
      await saveOrUpdateLocation(position, userId);
      const expectedLocation = new LocationBuilder().makeForUnknownCity().buildWithoutId();
      expect(locationApi.saveLocation).toHaveBeenCalledWith(userId, expectedLocation);
    });
  });
});
