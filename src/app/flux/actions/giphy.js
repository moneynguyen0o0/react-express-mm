import * as types from 'app/flux/types';
import { fetchImages } from 'app/utils/API';

const fetchSuccess = data => {
  return {
    type: types.FETCH_GIPHY,
    payload: data
  };
};

export const get = (offset = 0, limit = 20) => dispatch => fetchImages(offset, limit).then(data => dispatch(fetchSuccess(data)));
