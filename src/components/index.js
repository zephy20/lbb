import React from "react";
import MapContainer from "./MapContainer";
import "./styles/index.css";
import Typography from "@material-ui/core/Typography";
import PhotosWrapper from "./PhotosWrapper";

export default function Wrapper({
  pinLocation,
  handleSetPin,
  photos,
  getPhotos
}) {
  return (
    <div className="wrapper">
      <MapContainer pinLocation={pinLocation} handleSetPin={handleSetPin} />
      <Typography variant="h6" gutterBottom>
        Click anywhere on the map and then click "Get Photos"!
      </Typography>
      <PhotosWrapper photos={photos} getPhotos={getPhotos} />
    </div>
  );
}
