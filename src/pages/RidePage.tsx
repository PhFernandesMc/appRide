import { useEffect, useState } from "react";
import {
  addPosition,
  createNewRide,
  updateStopTime,
} from "../helpers/rideLogic";
import "../styles/components/RidePage.scss";

const RidePage = () => {
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [currentRide, setCurrentRide] = useState<string | null>(null);
  const [watchID, setWatchID] = useState<number>(0);

  const handleSuccess = (position: GeolocationPosition) => {
    if (currentRide) addPosition(currentRide, position);

    setCurrentSpeed(position.coords.speed ? position.coords.speed * 3.6 : 0);
  };

  const handleError = (error: unknown) => {
    console.error("Error processing ride data:", error);
  };

  const startRide = () => {
    if (watchID) return;
    const newRideId = Date.now().toString();
    setCurrentRide(newRideId);
    createNewRide(newRideId);
  };

  useEffect(() => {
    if (currentRide !== null) {
      const id = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
        }
      );
      setWatchID(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRide]);

  const stopRide = () => {
    if (!watchID) {
      window.location.replace("/appRide");
      return;
    }
    if (currentRide) updateStopTime(currentRide);
    navigator.geolocation.clearWatch;
    setCurrentRide(null);
    setWatchID(0);
    window.location.replace("/appRide");
  };

  return (
    <>
      <div className="speedometerContainer">
        <div className="buttonContainers">
          <button className="closeButton" onClick={stopRide}>
            X
          </button>
        </div>
        <div className="speedometer">
          <h2 className="speed">
            {currentSpeed ? currentSpeed.toFixed(1) : 0}
          </h2>
          <samp className="km">Km/h</samp>
        </div>
        <div className="buttonContainers">
          {!currentRide ? (
            <button className="startButton" onClick={startRide}>
              Start
            </button>
          ) : (
            <button className="stopButton" onClick={stopRide}>
              Stop
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default RidePage;
