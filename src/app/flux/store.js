import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'app/flux/reducers';

const configureStore = (initialState) => {
  const middleware = [thunk];

  return createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware), f => f)
  )
};

export default configureStore;
