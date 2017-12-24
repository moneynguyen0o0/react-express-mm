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
    case types.FETCH_GIPHY: {
      return state.concat(data);
    }
    default:
      return state;
  }
};

const phraseReducer = combineReducers({
  images: getGIFs
});

export default phraseReducer;
