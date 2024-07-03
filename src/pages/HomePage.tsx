import { Link } from "react-router-dom";
import { rideInfoType } from "../types";
import { useState, useEffect } from "react";
import { getData } from "../helpers/getInfo";
import "../styles/components/HomePage.scss";
import RideItem from "../components/RideItem";

const HomePage = () => {
  const [allRides, setAllRides] = useState<rideInfoType[]>([]);

  useEffect(() => {
    getData(setAllRides);
  }, []);

  return (
    <div className="homePage">
      <ul className="rideList">
        {allRides.length > 0 ? (
          allRides.map((ride, index) => (
            <div key={index}>
              {ride.value.data ? (
                <Link to={`rideDetail/${ride.id}`} state={{ data: ride }}>
                  <RideItem ride={ride} />
                </Link>
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <li>
            <p>No rides yet</p>
          </li>
        )}
      </ul>
      <div className="buttonContainer">
        <Link to="/Ride">
          <button className="newRideButton">
            <p className="newRideButtonText">+</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
