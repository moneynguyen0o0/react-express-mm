import * as types from 'app/flux/types';
import { fetchImageGIFs } from 'app/utils/API';

const wait = () => {
  return {
    type: types.WAIT_GIPHY
  };
};

const fetchSuccess = data => {
  return {
    type: types.FETCH_GIPHY_SUCCESS,
    payload: data
  };
};

export const fetch = (offset = 0, limit = 20) => dispatch => {
  dispatch(wait());

  return fetchImageGIFs(offset, limit)
    .then(data => dispatch(fetchSuccess(data)))
    .catch(err => console.log('', err));
};
