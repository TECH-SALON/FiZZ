import api, {endPoint} from '../api';

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
    let url = `${endPoint()}/auth/login`;
    console.log(url);
    api(getState).post(url, auth).then( response => {
      console.log(response.data);
      dispatch(loginSuccess(response.data));
    }).catch( error => {
      loginFail(error);
    })
  }
}

function loginRequest(){
  return {
    type: AUTH_LOGIN_REQUEST,
  }
}

function loginSuccess(tokens){
  return {
    type: AUTH_LOGIN_SUCCESS,
    tokens
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
    let url = `${endPoint()}/auth/signup`;
    console.log(url);
    api(getState).post(url, auth).then( response => {
      console.log(response);
      signupSuccess(response.data);
    }).catch( error => {
      signupFail(error);
    })
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
