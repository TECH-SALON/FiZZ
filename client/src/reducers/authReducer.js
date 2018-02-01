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
  userId: "",
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


const userLogin = (state, auth) => {
  localStorage.refreshToken = auth.tokens.refreshToken;
  return state
    .set('tokens', tokensToMap(auth.tokens))
    .set(IMap({'userId': auth.userId}))
    .set('logined', true)
    .set('isLoading', false)
}

const userLogout = (state) => {
  localStorage.removeItem("refreshToken");
  return state
    .set('tokens', {})
    .set('logined', false)
    .set('username', "")
}
const refreshTokens = (state, auth) => {
  localStorage.refreshToken = auth.tokens.refreshToken;
  console.log(auth);
  const userId = auth.userId;
  return state
    .set('tokens', tokensToMap(auth.tokens))
    .set('userId', auth.userId)
    .set('logined', true)
    .set('isLoading', false)
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case AUTH_LOGIN_SUCCESS:
    return userLogin(state, action.auth);
  case AUTH_GET_CURRENT_USER_SUCCESS:
    return refreshTokens(state, action.auth)
  case AUTH_LOGOUT_REQUEST:
    return userLogout(state, action)
  default:
    return state;
  }
}
