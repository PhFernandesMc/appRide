import { useEffect, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { rideInfoType } from "../types";

type mapProps = {
  ride: rideInfoType;
};

const MapComponent = ({ ride }: mapProps) => {
  const [rideTrail, setRideTrail] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    const trail = ride.value.data.map((position) => [
      position.latitude,
      position.longitude,
    ] as LatLngExpression);
    setRideTrail(trail);
  }, [ride.value.data]);

  useEffect(() => {
    if (rideTrail.length === 0) return;

    const map = L.map("map", {
      attributionControl: false,
    }).setView(rideTrail[0], 13);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      { minZoom: 5, maxZoom: 18 }
    ).addTo(map);

    const polyline = L.polyline(rideTrail, { color: "#f00" });
    polyline.addTo(map);

    return () => {
      map.remove();
    };
  }, [rideTrail]);

  return <div id="map"></div>;
};

export default MapComponent;


