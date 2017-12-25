import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import bots from './botsReducer';
import games from './gamesReducer';
import matches from './matchesReducer';
import accounts from './accountsReducer';
import auth from './authReducer';

const reducers = {
  router,
  bots,
  games,
  matches,
  accounts,
  auth
}

export default combineReducers(reducers)
