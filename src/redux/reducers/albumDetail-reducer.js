import { GET_ALBUM_DETAIL } from "../actions/types";

const INITIAL_STATE = {
  data: [],
};

function AlbumDetailReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALBUM_DETAIL:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default AlbumDetailReducer;
