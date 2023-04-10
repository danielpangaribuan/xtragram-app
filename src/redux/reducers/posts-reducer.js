import { GET_POSTS } from "../actions/types";

const INITIAL_STATE = {
  data: [],
};

function PostsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default PostsReducer;
