import { combineReducers } from 'redux';
import giphy from 'app/flux/reducers/giphy';
import post from 'app/flux/reducers/post';


const rootReducer = combineReducers({
  giphy,
  post
});

export default rootReducer;