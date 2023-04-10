import { createStore, combineReducers, applyMiddleware } from "redux";
// import {} from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

// import semua reducers
import UserReducer from "./reducers/user-reducer";
import PostsReducer from "./reducers/posts-reducer";
import AlbumsReducer from "./reducers/albums-reducer";
import AlbumDetailReducer from "./reducers/albumDetail-reducer";

const Reducers = combineReducers({
  userList: UserReducer,
  postsList: PostsReducer,
  albumsList: AlbumsReducer,
  albumDetail: AlbumDetailReducer,
});

// export function, ikutin dulu aja formatnya
export const createReduxStore = () =>
  createStore(Reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));
