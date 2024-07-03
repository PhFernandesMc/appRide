import { positionType, rideType } from "../types";
import { getRideRecord } from "./storage";

export const createNewRide = (rideId: string) => {
  const rideRecord: rideType = {
    data: [],
    startTime: rideId,
    stopTime: rideId,
  };
  localStorage.setItem(rideId, JSON.stringify(rideRecord));
};

export const addPosition = (rideId: string, position: GeolocationPosition) => {
  const rideRecord: rideType | null = getRideRecord(rideId);
  const newData: positionType = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    timestamp: position.timestamp,
  };

  if (rideRecord) {
    rideRecord.data.push(newData);
    localStorage.setItem(rideId, JSON.stringify(rideRecord));
  } else {
    console.error(`Ride record with id ${rideId} not found.`);
  }
};

export const updateStopTime = (rideID: string) => {
  const rideRecord: rideType | null = getRideRecord(rideID);
  if (rideRecord) {
    rideRecord.stopTime = Date.now().toString();
    localStorage.setItem(rideID, JSON.stringify(rideRecord));
  } else {
    console.error(`Ride record with id ${rideID} not found.`);
  }
};
