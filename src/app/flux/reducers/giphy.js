import { combineReducers } from 'redux';
import * as types from 'app/flux/types';

const getImages = (state = [], action) => {
  const {
    payload: {
      data = []
    } = {},
    type
  } = action;

  switch (action.type) {
    case types.FETCH_GIPHY: {
      return data;
    }
    default:
      return state;
  }
};

const phraseReducer = combineReducers({
  images: getImages
});

export default phraseReducer;
