import { GET_USER } from "../actions/types";

const INITIAL_STATE = {
  data: [],
};

function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default UserReducer;
