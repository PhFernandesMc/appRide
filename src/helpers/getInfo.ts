import React from "react";
import { cityInfo, positionType, rideInfoType, rideType } from "../types";
import { getAllRides } from "./storage";

export const getLocationData = async (latitude: number, longitude: number) => {
  const API_URL = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage&key=bdc_ed09bfb61ae34aec93b5119f569f3dde`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: cityInfo = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

export const getMaxSpeed = (positions: positionType[]) => {
  let maxSpeed = 0;
  positions.forEach((position) => {
    if (
      position.speed &&
      typeof position.speed === "number" &&
      position.speed > maxSpeed
    ) {
      maxSpeed = position.speed;
    }
  });
  return (maxSpeed * 3.6).toFixed(1);
};

export const getDistance = (positions: positionType[]) => {
  const toRad = (degree: number) => {
    return (degree * Math.PI) / 180;
  };

  const earthRadiusKm: number = 6371;
  let totalDistance: number = 0;

  for (let i = 0; i < positions.length - 1; i++) {
    const p1 = {
      latitude: positions[i].latitude,
      longitude: positions[i].longitude,
    };
    const p2 = {
      latitude: positions[i + 1].latitude,
      longitude: positions[i + 1].longitude,
    };

    const deltaLatitude: number = toRad(p2.latitude - p1.latitude);
    const deltaLongitude: number = toRad(p2.longitude - p1.longitude);

    const a =
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2) *
        Math.cos(toRad(p1.latitude)) *
        Math.cos(toRad(p2.latitude));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;

    totalDistance += distance;
  }

  return totalDistance.toFixed(2);
};

const getDuration = (startTime: string, stopTime: string) => {
  const format = (number: number, digits: number) => {
    return String(number.toFixed(0)).padStart(digits, "0");
  };

  const interval: number = (parseInt(stopTime) - parseInt(startTime)) / 1000;

  const minutes = Math.trunc(interval / 60);
  const seconds = interval % 60;

  return `${format(minutes, 2)}:${format(seconds, 2)}`;
};

const getStartDate = (startTime: string) => {
  const d = new Date(parseInt(startTime));

  const day = d.toLocaleString("en-US", { day: "numeric" });
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.toLocaleString("en-US", { year: "numeric" });

  const hour = d.toLocaleString("en-US", { hour: "2-digit", hour12: false });
  const minute = d.toLocaleString("en-US", { minute: "2-digit" });

  return `${hour}:${minute} - ${month} ${day}, ${year}`;
};

export const getData = async (
  setState: React.Dispatch<React.SetStateAction<rideInfoType[]>>
) => {
  const allRidesStringified: [string, string][] = getAllRides();

  const allRides: rideInfoType[] = await Promise.all(
    allRidesStringified.map(async (ride: [string, string]) => {
      try {
        const rideObj: rideType = JSON.parse(ride[1]);
        const locationData = await getLocationData(
          rideObj.data[0].latitude,
          rideObj.data[0].longitude
        );
        const duration: string = getDuration(
          rideObj.startTime,
          rideObj.stopTime
        );
        const date: string = getStartDate(rideObj.startTime);
        const maxSpeed: string = getMaxSpeed(rideObj.data);
        const totalDistance: string = getDistance(rideObj.data);
        return {
          id: ride[0],
          value: rideObj,
          location: locationData,
          maxSpeed: maxSpeed,
          totalDistance: totalDistance,
          duration: duration,
          date: date,
        };
      } catch (error) {
        console.error("Error processing ride data:", error);
        throw error;
      }
    })
  );

  setState(allRides);
};
