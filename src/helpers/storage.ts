import { rideType } from "../types";

export const getRideRecord = (rideId: string): rideType | null => {
  const ride: string | null = localStorage.getItem(rideId);
  if (ride) return JSON.parse(ride);
  return null;
};

export const getAllRides = (): [string, string][] => {
  return Object.entries(localStorage);
};

export const deleteRide = (rideID: string) => {
  localStorage.removeItem(rideID)
  window.location.replace("/appRide")
}
