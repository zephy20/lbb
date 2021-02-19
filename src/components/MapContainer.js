import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../constants";

const containerStyle = {
  width: "100%",
  height: "80vh"
};

const defaultCenter = {
  lat: 28.7041,
  lng: 77.1025
};

function MapContainer({ handleSetPin, pinLocation }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      onClick={handleSetPin}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      }}
    >
      <Marker position={pinLocation} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
