import {
  Map as IMap, List as IList
} from 'immutable';

// import {
//   matchSummaryToMap
// } from './matchReducer';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGHUP_REQUEST,
  AUTH_SIGHUP_SUCCESS
} from '../actions/authAction';

export const initialState = IMap({
  tokens: IMap(),
  logined: false,
  isLoading: true,
  error: IMap(),
});

const tokensToMap = (tokens) => {
  let mappedTokens = IMap({
    accessToken: tokens.accessToken,
    idToken: tokens.idToken,
    refreshToken: tokens.refreshToken,
  });
  return mappedTokens;
};

const userLogin = (state, tokens) => {
  return state
    .set('tokens', tokensToMap(tokens))
    .set('logined', true)
    .set('isLoading', false)
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case AUTH_LOGIN_SUCCESS:
    return userLogin(state, action.tokens);
  default:
    return state;
  }
}
