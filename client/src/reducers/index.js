import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import bots from './botsReducer';

const reducers = {
  router,
  bots,
}

export default combineReducers(reducers)
