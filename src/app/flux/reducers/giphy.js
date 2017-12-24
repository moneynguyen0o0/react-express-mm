import { combineReducers } from 'redux';
import * as types from 'app/flux/types';

const getGIFs = (state = [], action) => {
  const {
    payload: {
      data = []
    } = {},
    type
  } = action;

  switch (action.type) {
    case types.FETCH_GIPHY_SUCCESS: {
      return state.concat(data);
    }
    default:
      return state;
  }
};

const wait = ( state = false, action) => {
  switch (action.type) {
    case types.WAIT_GIPHY:
      return true;
    case types.FETCH_GIPHY_SUCCESS:
      return false;
    default:
      return state;
  }
};

const giphyReducer = combineReducers({
  images: getGIFs,
  isWaiting: wait
});

export default giphyReducer;
