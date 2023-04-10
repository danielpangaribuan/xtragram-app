import Axios from "axios";
import { GET_ALBUMS, GET_ALBUM_DETAIL } from "./types";

const API = "https://jsonplaceholder.typicode.com";

export const getAlbums = () => {
  return async (dispatch) => {
    try {
      const responseAlbums = await Axios.get(API + "/albums");
      const responseUser = await Axios.get(API + "/users");
      const dataUser = responseUser.data;
      const result = responseAlbums.data.map((vAlbums) => {
        let idx = dataUser.findIndex((vUser) => vUser.id === vAlbums.userId);

        if (idx < 0) return { ...vAlbums };
        return {
          ...vAlbums,
          name: dataUser[idx].name,
        };
      });
      dispatch({ type: GET_ALBUMS, payload: result });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAlbumDetail = ({ id }) => {
  return async (dispatch) => {
    try {
      const responsePhotos = await Axios.get(API + `/photos?albumId=${id}`);

      dispatch({ type: GET_ALBUM_DETAIL, payload: responsePhotos.data });
    } catch (error) {
      console.log(error);
    }
  };
};
