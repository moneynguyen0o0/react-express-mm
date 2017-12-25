import request from 'app/utils/request';

export const fetchImageGIFs = (offset = 0, limit = 20) => {
  return request({ url: `/images?offset=${offset}&limit=${limit}` });
};

export const fetchBlogs = () => {
  return request({ url: '/blogs' });
};

export const findBlog = (id) => {
  return request({ url: '/blogs/' + id });
};