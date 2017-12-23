import axios from 'axios';

export const getPhotos = async (req, res, next) => {
  const { data } =  await axios.get('https://jsonplaceholder.typicode.com/photos');

  res.json(data);
};


export const getUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};
