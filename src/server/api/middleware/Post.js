import axios from 'axios';

const POST_API = 'https://jsonplaceholder.typicode.com/posts';

export const get = () => {
  return axios.get(POST_API);
};

export const find = async (req, res, next) => {
  const { params: { id } } = req;

  const { data } =  await axios.get(POST_API + '/' + id);

  res.json(data);
};