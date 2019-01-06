import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
// import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  compose(
    // applyMiddleware(logger),
  )
);

export default store;