import { combineReducers } from 'redux';
import * as types from 'app/flux/types';

const getBlogs = (state = [], action) => {
  const {
    payload: data = [],
    type
  } = action;

  switch (action.type) {
    case types.FETCH_BLOGS_SUCCESS: {
      return data;
    }
    default:
      return state;
  }
};

const getBlog = (state = {}, action) => {
  const {
    payload: data = {},
    type
  } = action;

  switch (action.type) {
    case types.FIND_BLOG_SUCCESS: {
      return data;
    }
    default:
      return state;
  }
};

const blogReducer = combineReducers({
  blogs: getBlogs,
  blog: getBlog
});

export default blogReducer;
