import axios from "axios";
import { FLICKR_API_PARAMS, FLICKR_API_ENDPOINT } from "../constants";

export const getPhotos = async ({ lat, lng, page }) => {
  try {
    const res = await axios.get(FLICKR_API_ENDPOINT, {
      params: {
        ...FLICKR_API_PARAMS,
        lat,
        lon: lng,
        page
      }
    });

    if (res.data && res.data.photos) {
      return res.data.photos;
    }
  } catch (error) {
    return;
  }
};
