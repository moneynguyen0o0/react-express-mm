import { combineReducers } from 'redux';
import giphy from 'app/flux/reducers/giphy';
import blog from 'app/flux/reducers/blog';


const rootReducer = combineReducers({
  giphy,
  blog
});

export default rootReducer;
