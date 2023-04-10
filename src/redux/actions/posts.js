import Axios from "axios";
import { GET_POSTS } from "./types";

const API = "https://jsonplaceholder.typicode.com";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const responsePost = await Axios.get(API + "/posts");
      const responseUser = await Axios.get(API + "/users");
      const responseComment = await Axios.get(API + "/comments");

      const dataUser = responseUser.data;
      const dataComment = responseComment.data;
      const result = responsePost.data.map((vPost) => {
        let idx = dataUser.findIndex((vUser) => vUser.id === vPost.userId);

        let arrComment = dataComment.filter(
          (vComment) => vComment.postId === vPost.id
        );
        if (idx < 0)
          return { ...vPost, comment: arrComment, commentIsOpen: false };
        return {
          ...vPost,
          name: dataUser[idx].name,
          comment: arrComment,
          commentIsOpen: false,
        };
      });
      dispatch({ type: GET_POSTS, payload: result });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPost = (payload) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API + "/posts", payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = ({ id }) => {
  return async (dispatch) => {
    try {
      const response = await Axios.delete(API + `/posts/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addComment = (payload) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API + "/comments", payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
};

export const deleteComment = ({ id }) => {
  return async (dispatch) => {
    try {
      const response = await Axios.delete(API + `/comments/${id}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
};
