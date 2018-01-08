import request from 'app/utils/request';

export const fetchImageGIFs = (offset = 0, limit = 20) => {
  return request({ url: `/images?offset=${offset}&limit=${limit}` });
};

export const fetchPosts = () => {
  return request({ url: '/posts' });
};

export const findPost = (id) => {
  return request({ url: '/posts/' + id });
};