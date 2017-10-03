import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';
import homeReducer from './homeReducer';
// import { withRouter } from 'react-router-dom';

// const store = createStore(reducer, {}, applyMiddleware(thunk, logger));

// export default store;

export default createStore(
  combineReducers({
    reducer,
    homeReducer
  }),
  {},
  applyMiddleware(thunk, logger)
);
