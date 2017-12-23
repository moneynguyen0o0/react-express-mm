import _ from 'lodash';
import axios from 'axios';
import { isClient, baseURL } from 'config/app';

const PREFIX_URL = '/api';

const getBaseURL = () => {
  return isClient ? PREFIX_URL : baseURL + PREFIX_URL;
};

const getConfig = (config = {}) => {
  config.method = config.method || 'get';
  config.responseType = config.responseType || 'json';
  config.headers = _.defaults(config.headers, {});
  config.url = (config.baseURL || getBaseURL()) + (config.url || '');
  // Add CORS credentials on browser side
  config.withCredentials = config.withCredential ? config.withCredentials : true;

  return config;
};

export default async (config = {}) => {
  try {
    const { data } = await axios(getConfig(config));

    return data;
  } catch (error) {
    throw error;
  }
};
