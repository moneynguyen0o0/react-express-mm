import { combineReducers } from 'redux';
import giphy from 'app/flux/reducers/giphy';
import post from 'app/flux/reducers/post';
import calculator from 'app/flux/reducers/calculator';


const rootReducer = combineReducers({
  giphy,
  post,
  calculator
});

export default rootReducer;