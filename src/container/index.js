import React, { useState, useEffect } from "react";
import { getPhotos } from "../api";
import Wrapper from "../components";

export default function GMapsPhotoFinderContainer() {
  const [pinLocation, setPinLocation] = useState({
    lat: 28.7041,
    lng: 77.1025
  });

  const [photos, setPhotos] = useState({
    pageNo: 1,
    data: [],
    isFetching: false,
    totalPages: null
  });

  const getPhotosBasedOnLocation = async pageNo => {
    const pendingState = {
      ...photos,
      isFetching: true
    };

    setPhotos(pendingState);

    const res = await getPhotos({
      ...pinLocation,
      page: pageNo
    });

    let updatedState = {
      ...photos,
      isFetching: false
    };

    if (res) {
      updatedState = {
        ...photos,
        data: res.photo,
        isFetching: false,
        totalPages: res.pages,
        pageNo
      };
    }

    setPhotos(updatedState);
  };

  const handleSetPin = newPinDetails => {
    setPinLocation({
      lat: newPinDetails.latLng.lat(),
      lng: newPinDetails.latLng.lng()
    });
  };
  return (
    <Wrapper
      pinLocation={pinLocation}
      photos={photos}
      handleSetPin={handleSetPin}
      getPhotos={getPhotosBasedOnLocation}
    />
  );
}
