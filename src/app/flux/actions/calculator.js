import * as types from 'app/flux/types';
import { handleCalculation } from 'app/utils/API';

const wait = () => {
  return {
    type: types.WAIT_CALCULATION
  };
};

const calculateSuccess = (data) => {
  return {
    type: types.CALCULATE_SUCCESS,
    data
  };
};

export const calculate = (value1, value2, operand) => dispatch => {
  dispatch(wait());

  return handleCalculation({value1, value2, operand})
    .then(data => dispatch(calculateSuccess(data)))
    .catch(err => console.log('', err));
};
