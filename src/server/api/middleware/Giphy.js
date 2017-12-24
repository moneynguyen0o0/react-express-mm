import axios from 'axios';

const GIPHY_API = 'https://api.giphy.com/v1/gifs/trending';
const API_KEY = 'YlR5nHmX7ZcRN0naU5IabHz5opIGIpAv';


export const get = async (req, res, next) => {
  const {
    query: {
      offset = 0,
      limit = 20
    } = {}
  } = req;

  const URL = `${GIPHY_API}?api_key=${API_KEY}&offset=${offset}&limit=${limit}`;

  const { data } =  await axios.get(URL);

  res.json(data);
};
