import api from '../api';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';

export const AUTH_SIGHUP = 'AUTH_SIGHUP';
export const AUTH_SIGHUP_REQUEST = 'AUTH_SIGHUP_REQUEST';
export const AUTH_SIGHUP_SUCCESS = 'AUTH_SIGHUP_SUCCESS';
export const AUTH_SIGHUP_FAIL = 'AUTH_SIGHUP_FAIL';

export function login(auth) {
  return(dispatch, getState) => {
    dispatch(loginRequest());
    let params = new FormData();
    // params.append('botId', botId);
    // let url = "/api/v1/games/reversi/match";
    // api(getState).post(url, params).then( response => {
    //   loginSuccess(response.data);
    // }).catch( error => {
    //   loginFail(error);
    // })
  }
}

function loginRequest(){
  return {
    type: AUTH_LOGIN_REQUEST,
  }
}

function loginSuccess(){
  return {
    type: AUTH_LOGIN_SUCCESS,
  }
}

function loginFail(error){
  return {
    type: AUTH_LOGIN_FAIL,
    error,
  }
}


export function signup(auth) {
  return(dispatch, getState) => {
    dispatch(signupRequest());
    let params = new FormData();
    // params.append('botId', botId);
    // let url = "/api/v1/games/reversi/match";
    // api(getState).post(url, params).then( response => {
    //   signupSuccess(response.data);
    // }).catch( error => {
    //   signupFail(error);
    // })
  }
}

function signupRequest(){
  return {
    type: AUTH_LOGIN_REQUEST,
  }
}

function signupSuccess(){
  return {
    type: AUTH_LOGIN_SUCCESS,
  }
}

function signupFail(error){
  return {
    type: AUTH_LOGIN_FAIL,
    error,
  }
}
