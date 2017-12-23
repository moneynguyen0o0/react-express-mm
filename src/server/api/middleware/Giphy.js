import axios from 'axios';

export const get = async (req, res, next) => {
  const { data } =  await axios.get('https://api.giphy.com/v1/gifs/trending?api_key=YlR5nHmX7ZcRN0naU5IabHz5opIGIpAv&offset=0&limit=20');

  res.json(data);
};
