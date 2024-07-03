import { Link, useLocation, useParams } from "react-router-dom";
import { rideInfoType } from "../types";
import "../styles/components/RideDetail.scss";
import { deleteRide } from "../helpers/storage";
import MapComponent from "../components/MapComponent";

const RideDetailPage = () => {
  const { rideID } = useParams();
  const location = useLocation();
  const ride: rideInfoType = location.state?.data || {};

  return (
    <>
      {rideID === ride.id ? (
        <div className="rideDetailContainer">
          <div className="buttonContainers">
            <Link to={"/appRide"}>
              <button className="closeButton">X</button>
            </Link>
          </div>
          <div className="rideDetailInfo">
            <div className="mapElement">
              <MapComponent ride={ride}/>
            </div>
            <div className="dataElement">
              <div className="cityInfo">
                <p>
                  {ride.location.city} - {ride.location.countryCode}
                </p>
              </div>
              <div className="maxSpeed">
                <p>Max speed: {ride.maxSpeed} Km/h</p>
              </div>
              <div className="lighterText">
                <p>Distance: {ride.totalDistance} Km</p>
              </div>
              <div className="lighterText">
                <p>{ride.duration}</p>
              </div>
              <div className="date">
                <p>{ride.date}</p>
              </div>
            </div>
          </div>
          <div className="buttonContainers">
            <button className="deleteButton" onClick={() => deleteRide(rideID)}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="ErrorAlert">
          <p>error: something went wrong, please try it later</p>
        </div>
      )}
    </>
  );
};

export default RideDetailPage;
