import * as types from 'app/flux/types';
import { fetchPosts, findPost } from 'app/utils/API';

const fetchPostsSuccess = data => {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    payload: data
  };
};

const findPostSuccess = data => {
  return {
    type: types.FIND_POST_SUCCESS,
    payload: data
  };
};

export const fetchAll = () => dispatch => {
  return fetchPosts()
    .then(data => dispatch(fetchPostsSuccess(data)))
    .catch(err => console.log('fetchPosts', err));
};

export const find = (id) => dispatch => {
  return findPost(id)
    .then(data => dispatch(findPostSuccess(data)))
    .catch(err => console.log('fetchPost', err));
};