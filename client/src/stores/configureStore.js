import { createStore, applyMiddleware } from 'redux'
import {combineReducers} from 'redux-immutable'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import {connectRouter, routerMiddleware} from 'connected-react-router/immutable'
import reducers from '../reducers';
import Immutable from 'immutable';

export const history = createHistory()

export default function configureStore(initialState = Immutable.Map()) {
  const router = routerMiddleware(history)
  const store = createStore(connectRouter(history)(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(thunk, router))
  );

  return store;
}
