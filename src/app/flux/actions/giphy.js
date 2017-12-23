import * as types from 'app/flux/types';
import { fetchImages } from 'app/utils/API';

const fetchSuccess = data => {
  return {
    type: types.FETCH_GIPHY,
    payload: data
  };
};

export const get = () => dispatch => fetchImages().then(data => dispatch(fetchSuccess(data)));
