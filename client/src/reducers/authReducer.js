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
  AUTH_SIGHUP_SUCCESS,
  AUTH_GET_CURRENT_USER_SUCCESS,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS
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
  localStorage.refreshToken = tokens.refreshToken;
  return state
    .set('tokens', tokensToMap(tokens))
    .set('logined', true)
    .set('isLoading', false)
}

const userLogout = (state) => {
  localStorage.removeItem("refreshToken");
  return state
    .set('tokens', {})
    .set('logined', false)
}
const refreshTokens = (state, tokens) => {
  localStorage.refreshToken = tokens.refreshToken;
  return state
    .set('tokens', tokensToMap(tokens))
    .set('logined', true)
    .set('isLoading', false)
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case AUTH_LOGIN_SUCCESS:
    console.log("here");
    return userLogin(state, action.tokens);
  case AUTH_GET_CURRENT_USER_SUCCESS:
    return refreshTokens(state, action.tokens)
  case AUTH_LOGOUT_REQUEST:
    return userLogout(state, action)
  default:
    return state;
  }
}
