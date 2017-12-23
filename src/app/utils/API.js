import request from 'app/utils/request';

export const fetchImages = () => {
  return request({ url: '/images' });
};
