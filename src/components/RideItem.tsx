import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { rideItemProps } from "../types";

const RideItem = ({ ride }: rideItemProps) => {
  useEffect(() => {
    const map = L.map(`map-${ride.id}`, {
      attributionControl: false,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
    }).setView([ride.value.data[0].latitude, ride.value.data[0].longitude], 13);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      { minZoom: 10, maxZoom: 18 }
    ).addTo(map);

    L.marker([ride.value.data[0].latitude, ride.value.data[0].longitude])
      .addTo(map)

    return () => {
      map.remove();
    };
  }, [ride]);

  return (
    <li className="rideItem" id={ride.id}>
      <div className="mapElement">
        <div
          className="map"
          id={`map-${ride.id}`}
        ></div>
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
    </li>
  );
};

export default RideItem;
