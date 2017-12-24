import axios from 'axios';

export const get = () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts');
};

export const find = async (req, res, next) => {
  const { params: { id } } = req;

  const { data } =  await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);

  res.json(data);
};