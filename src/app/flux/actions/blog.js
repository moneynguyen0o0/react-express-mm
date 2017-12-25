import * as types from 'app/flux/types';
import { fetchBlogs, findBlog } from 'app/utils/API';

const fetchBlogsSuccess = data => {
  return {
    type: types.FETCH_BLOGS_SUCCESS,
    payload: data
  };
};

const findBlogSuccess = data => {
  return {
    type: types.FIND_BLOG_SUCCESS,
    payload: data
  };
};

export const fetchAll = () => dispatch => {
  return fetchBlogs()
    .then(data => dispatch(fetchBlogsSuccess(data)))
    .catch(err => console.log('fetchBlogs', err));
};

export const find = (id) => dispatch => {
  return findBlog(id)
    .then(data => dispatch(findBlogSuccess(data)))
    .catch(err => console.log('fetchBlog', err));
};