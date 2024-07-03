export type rideType = {
  data: positionType[];
  startTime: string;
  stopTime: string;
};

export type positionType = {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
  timestamp: number;
};

export type cityInfo = {
  latitude: number;
  longitude: number;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  csdCode: string;
  localityInfo: {
    administrative: {
      name: string;
      description: string;
      isoName: string;
      order: number;
      adminLevel: number;
      isoCode: string;
      wikidataId: string;
      geonameId: number;
    }[];
    informative: {
      name: string;
      description: string;
      isoName: string;
      order: number;
      isoCode: string;
      wikidataId: string;
      geonameId: number;
    }[];
  };
};

export type rideInfoType = {
  id: string;
  value: rideType;
  location: cityInfo;
  maxSpeed: string;
  totalDistance: string;
  duration: string;
  date: string;
};

export type rideItemProps = {
  ride: rideInfoType;
};
