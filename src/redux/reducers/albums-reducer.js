import { GET_ALBUMS } from "../actions/types";

const INITIAL_STATE = {
  data: [],
};

function AlbumsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALBUMS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default AlbumsReducer;
