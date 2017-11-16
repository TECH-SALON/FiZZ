import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import bots from './botsReducer';
import games from './gamesReducer';

const reducers = {
  router,
  bots,
  games
}

export default combineReducers(reducers)
