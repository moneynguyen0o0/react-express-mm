import { combineReducers } from 'redux';
import * as types from 'app/flux/types';

const calculateSuccess = (state = '0', action) => {
  console.log('action here', state)
  const {
    data = '0',
    type
  } = action;

  switch (action.type) {
    case types.CALCULATE_SUCCESS: {
      return data.toString();
    }
    default:
      return state;
  }
};

const wait = ( state = false, action) => {
  switch (action.type) {
    case types.WAIT_CALCULATION:
      return true;
    case types.CALCULATE_SUCCESS:
      return false;
    default:
      return state;
  }
};

const calculatorReducer = combineReducers({
  result: calculateSuccess,
  isWaiting: wait
});

export default calculatorReducer;
