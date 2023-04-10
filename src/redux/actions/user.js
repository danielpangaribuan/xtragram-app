import Axios from "axios";
import { GET_USER } from "./types";

const API = "https://jsonplaceholder.typicode.com";

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(API + "/users");
      dispatch({ type: GET_USER, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
