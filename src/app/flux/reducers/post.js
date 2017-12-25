import { combineReducers } from 'redux';
import * as types from 'app/flux/types';

const getPosts = (state = [], action) => {
  const {
    payload: data = [],
    type
  } = action;

  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS: {
      return data;
    }
    default:
      return state;
  }
};

const getPost = (state = {}, action) => {
  const {
    payload: data = {},
    type
  } = action;

  switch (action.type) {
    case types.FIND_POST_SUCCESS: {
      return data;
    }
    default:
      return state;
  }
};

const postReducer = combineReducers({
  posts: getPosts,
  post: getPost
});

export default postReducer;